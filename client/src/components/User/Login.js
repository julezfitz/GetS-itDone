import { React, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Alert } from "@mui/material";
import axios from "axios";
import { UserContext } from "../Application";
import { FormControl } from "@mui/material";
import { keyframes } from "styled-components";
import Redirect from "./Redirect";
import RegisterModal from "./Registration/Register";
import GoogleLogIn from "./GoogleLogin/GoogleLogIn";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	transform: "translate(-50%, -50%)",
	width: 400,
	height: 500,
	backgroundColor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	borderRadius: "10px",
};

const blurAnim = keyframes`
	0% {
		top: 0;
		left: 0
	}

	100% {
		bottom: 0;
		right: 0
	}
`;

const blurCircleStyle = {
	width: "17rem",
	height: "17rem",
	backgroundColor: "orange",
	position: "absolute",
	borderRadius: "50%",
	filter: "blur(60px)",
	zIndex: "-2",
};

const ELEMENTSPACING = "1rem";

export default function LoginModal({ open, handleClose, setModalOpen }) {
	const { toggleLoggedIn, isLoggedIn, refreshUserDetails } = useContext(UserContext);

	const [loginState, setLoginState] = useState({
		email: {
			value: "",
			error: false,
			errorMessage: null,
		},
		password: {
			value: "",
			error: false,
			errorMessage: null,
		},
	});
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(false);

	useEffect(() => {
		if (loading) {
			axios
				.post("http://localhost:8001/user/session", {
					email: loginState.email.value,
					password: loginState.password.value,
				})
				.then(response => {
					const errors = response.data.authentication.errors;

					errors.message && setErrors(errors.message);

					errors.fields &&
						errors.fields.forEach(field => {
							setLoginState(prev => ({
								...prev,
								[field.fieldName]: {
									value: prev[field.fieldName].value,
									error: true,
									errorMessage: errors.message,
								},
							}));
						});

					const isAuthenticated = response.data.authentication.isAuthenticated;
					if (errors && errors.length >= 0) setErrors(errors);
					if (isAuthenticated) return refreshUserDetails(response.data.authentication.user.id).then(toggleLoggedIn)
				})
				.catch(err => {
					console.log("err", err);
				})
				.finally(setLoading(false));
		}
	}, [loading, isLoggedIn, errors]);

	const handleChange = e => {
		setErrors(false);
		const textFieldName = e.target.name;

		setLoginState(prev => ({
			...prev,
			[textFieldName]: {
				value: e.target.value,
				error: false,
				errorMessage: null,
			},
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
	};

	return (
		<>
			<div>
				<Modal
					open={open}
					onClose={() => setModalOpen(null)}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<Typography
							id='modal-modal-title'
							variant='h6'
							component='h2'
							sx={{ mb: 5, textAlign: "center", fontFamily: "Inter" }}
						>
							Log in to GSD
						</Typography>
						<Typography component='span'id='modal-modal-description' sx={{ mt: 2 }}>
							<Box
								component='form'
								sx={{ "& .MuiTextField-root": { m: 1 }, padding: "30px" }}
								noValidate
								autoComplete='off'
								onSubmit={handleSubmit}
							>
								<TextField
									placeholder='justine@example.com'
									fullWidth
									required
									id='outlined-required'
									label='Email'
									name='email'
									value={loginState.email.value}
									onChange={handleChange}
									error={loginState.email.error}
									label={
										loginState.email.error
											? loginState.email.errorMessage
											: "Email"
									}
								/>
								<TextField
									placeholder='Password'
									fullWidth
									required
									id='outlined-password-input'
									label='Password'
									type='password'
									autoComplete='current-password'
									name='password'
									value={loginState.password.value}
									onChange={handleChange}
									error={loginState.password.error}
									label={
										loginState.password.error
											? loginState.password.errorMessage
											: "Password"
									}
								/>

								<Button
									size={"large"}
									type='submit'
									color='secondary'
									fullWidth
									variant='contained'
									sx={{ marginTop: 5 }}
								>
									{loading ? "Loading..." : "Log in"}
								</Button>
								{/* <GoogleLogIn /> */}
								{errors && (
									<Alert severity='error' sx={{ marginTop: ELEMENTSPACING }}>
										{errors}
									</Alert>
								)}
							</Box>
						</Typography>
						<Redirect to={"register"} setModalOpen={setModalOpen} />
					</Box>
				</Modal>
			</div>
		</>
	);
}

import { React, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Alert } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../Application";
import { keyframes } from "styled-components";
import Redirect from "../Redirect";
import useTheme from "@mui/material/styles/useTheme";
import { fieldStyles } from "../styles/styles";
import LoginForm from "./LoginForm";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const ELEMENTSPACING = "1rem";

export default function LoginModal({ open, handleClose, setModalOpen }) {
	const theme = useTheme();

	const { toggleLoggedIn, isLoggedIn, refreshUserDetails } =
		useContext(UserContext);

	const [loginState, setLoginState] = useState({
		success: false,
		successAnimationComplete: false,
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
					if (isAuthenticated) {
						setLoginState(prev => ({ ...prev, success: true }));
						refreshUserDetails(response.data.authentication.user.id).then(() =>
							toggleLoggedIn(response.data.authentication.user)
						);
					}
				})
				.catch(err => {
					console.log("err", err);
				})
				.finally(setLoading(false));
		}
	}, [loading, isLoggedIn, errors, loginState.successAnimationComplete]);

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
						<IconButton onClick={() => setModalOpen(null)} sx={{ position: 'absolute', right: 15, top: 15, }}>
          		<CloseIcon />
        		</IconButton>
						<Typography
							id='modal-modal-title'
							variant='h6'
							component='h2'
							sx={{ mb: 5, textAlign: "center", fontFamily: "Inter" }}
						>
							Welcome to GSD
						</Typography>
						<Typography
							component='span'
							id='modal-modal-description'
							sx={{ mt: 2 }}
						>
							<LoginForm
								handleSubmit={handleSubmit}
								handleChange={handleChange}
								loading={loading}
								errors={errors}
								fieldStyles={fieldStyles}
								loginState={loginState}
							/>
						</Typography>
						<Redirect to={"register"} setModalOpen={setModalOpen} />
					</Box>
				</Modal>
			</div>
		</>
	);
}

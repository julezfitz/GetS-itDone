import { React, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Alert } from "@mui/material";
import axios from "axios";
import { UserContext } from "../Application";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const ELEMENTSPACING = "1rem";

export default function LoginModal({ open, handleClose }) {
	const { toggleLoggedIn, isLoggedIn } = useContext(UserContext);

	const [value, setValue] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(false);

	useEffect(() => {
		if (loading) {
			console.log("in here!!!");
			axios
				.post("http://localhost:8001/user/session", {
					email: value.email,
					password: value.password,
				})
				.then(response => {
					const errors = response.data.authentication.errors;
					const isAuthenticated = response.data.authentication.isAuthenticated;
					const userDetails = response.data.authentication.user;
					isAuthenticated && toggleLoggedIn(userDetails);
					errors.length >= 0 && setErrors(errors);
				})
				.catch(err => {
					console.log(err);
				})
				.finally(setLoading(false));
		}
	}, [loading, isLoggedIn, errors]);

	const handleChange = e => {
		setErrors(false);
		const textFieldName = e.target.name;
		console.log(textFieldName);

		setValue(prev => ({
			...prev,
			[textFieldName]: e.target.value,
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Login
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						<Box
							component='form'
							sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
							noValidate
							autoComplete='off'
							onSubmit={handleSubmit}
						>
							<TextField
								fullWidth
								required
								id='outlined-required'
								label='Email'
								name='email'
								value={value.email}
								onChange={handleChange}
							/>
							<TextField
								fullWidth
								required
								id='outlined-password-input'
								label='Password'
								type='password'
								autoComplete='current-password'
								name='password'
								value={value.password}
								onChange={handleChange}
							/>
							{/* <p>{user.isLoggedIn}</p> */}

							<Button
								size={"large"}
								type='submit'
								color='primary'
								fullWidth
								variant='contained'
								sx={{ marginTop: ELEMENTSPACING }}
							>
								{loading ? "Loading..." : "Log in"}
							</Button>
							{errors &&
								errors.map(err => {
									return (
										<Alert severity='error' sx={{ marginTop: ELEMENTSPACING }}>
											{err.message}
										</Alert>
									);
								})}
						</Box>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}

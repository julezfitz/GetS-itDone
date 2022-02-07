import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Alert } from "@mui/material";
import axios from "axios";

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

export default function LoginModal({ open, handleClose }) {
	const [value, setValue] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [errors, setErrors] = useState(false);

	useEffect(() => {
		if (loading) {
			axios
				.post("http://localhost:8001/user/session", {
					email: value.email,
					password: value.password,
				})
				.then(response => {
					const errors = response.data.authentication.errors;

					const isAuthenticated = response.data.authentication.isAuthenticated;
					isAuthenticated && setLoggedIn(true);
					errors.length >= 0 && setErrors(errors);
				})
				.catch(err => {
					console.log(err);
				})
				.finally(setLoading(false));
		}
	}, [loading, loggedIn, errors]);

	const handleChange = e => {
		setErrors(false);
		const textFieldName = e.target.name;
		console.log(textFieldName);

		setValue(prev => ({
			...prev,
			[textFieldName]: e.target.value,
		}));
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
						>
							<div>
								<TextField
									required
									id='outlined-required'
									label='Email'
									name='email'
									value={value.email}
									onChange={handleChange}
								/>
								<TextField
									required
									id='outlined-password-input'
									label='Password'
									type='password'
									autoComplete='current-password'
									name='password'
									value={value.password}
									onChange={handleChange}
								/>
							</div>
							<Button
								color='primary'
								fullWidth
								variant='contained'
								onClick={() => setLoading(true)}
							>
								{loading ? "Loading..." : "Log in"}
							</Button>
							{errors &&
								errors.map(err => {
									return <Alert severity='error'>{err.message}</Alert>;
								})}
						</Box>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}

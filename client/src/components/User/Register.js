import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useSubmit } from "../../hooks/useSubmit";
import { UserContext } from "../Application";
import Error from "./Error";
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

export default function RegisterModal({ open, handleClose }) {
	const { toggleLoggedIn } = useContext(UserContext);

	const [registerState, setRegisterState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		city: "",
		postalCode: "",
		country: "",
		password: "",
		passwordConfirmation: "",
	});

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);

	const handleChange = e => {
		setErrors(null);
		setRegisterState(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
	};

	useEffect(() => {
		if (loading) {
			axios
				.post(`http://localhost:8001/user/register`, registerState)
				.then(res => {
					res.data.registration.errors.length >= 1 &&
						setErrors(res.data.registration.errors);
					res.data.registration.isRegistered &&
						toggleLoggedIn(res.data.registration.user);
				})
				.catch(err => setErrors(err))
				.finally(setLoading(false));
		}
	}, [loading]);

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
						Register an Account
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						<Box
							component='form'
							sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
							noValidate
							autoComplete='off'
							onSubmit={handleSubmit}
						>
							<div>
								<TextField
									required
									id='outlined-required'
									label='First Name'
									value={registerState.firstName}
									onChange={handleChange}
									name='firstName'
								/>
								<TextField
									required
									id='outlined-required'
									label='Last Name'
									name='lastName'
									value={registerState.lastName}
									onChange={handleChange}
								/>
								<TextField
									required
									id='outlined-required'
									label='Email'
									name='email'
									value={registerState.email}
									onChange={handleChange}
								/>
								<TextField
									required
									id='outlined-required'
									label='City/Town'
									name='city'
									value={registerState.city}
									onChange={handleChange}
								/>
								<TextField
									required
									id='outlined-required'
									label='Postal Code'
									name='postalCode'
									value={registerState.postalCode}
									onChange={handleChange}
								/>
								<TextField
									required
									id='outlined-required'
									label='Country'
									name='country'
									value={registerState.country}
									onChange={handleChange}
								/>
								<TextField
									required
									id='outlined-password-input'
									label='Password'
									type='password'
									autoComplete='current-password'
									name='password'
									value={registerState.password}
									onChange={handleChange}
								/>
								<TextField
									required
									id='outlined-password-input'
									label='Password Confirmation'
									type='password'
									autoComplete='current-password'
									name='passwordConfirmation'
									value={registerState.passwordConfirmation}
									onChange={handleChange}
								/>
							</div>
							<Button size='large' variant='contained' fullWidth type='submit'>
								Create Account
							</Button>
							{errors &&
								errors.map((err, i) => {
									return <Error key={i} errorMessage={err.message} />;
								})}
						</Box>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}

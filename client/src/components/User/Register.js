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
import { FormGroup, FormControl } from "@mui/material";
import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	border: "2px solid #000",
	borderRadius: "10px",
	boxShadow: 24,
	p: 10,
};

export default function RegisterModal({ open, handleClose }) {
	const { toggleLoggedIn } = useContext(UserContext);

	const [registerState, setRegisterState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		city: "",
		province: "",
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
					<Typography
						id='1r'
						variant='h6'
						component='h2'
						sx={{ mb: 5, textAlign: "center" }}
					>
						Create an Account
					</Typography>

					<Box
						component='form'
						sx={{ "& .MuiTextField-root": { m: 1 } }}
						noValidate
						autoComplete='off'
						onSubmit={handleSubmit}
					>
						<FormGroup row>
							<TextField
								required
								id='2r'
								label='First Name'
								value={registerState.firstName}
								onChange={handleChange}
								name='firstName'
							/>
							<TextField
								required
								id='3r'
								label='Last Name'
								name='lastName'
								value={registerState.lastName}
								onChange={handleChange}
							/>
						</FormGroup>

						<FormControl fullWidth>
							<TextField
								required
								id='4r'
								label='Email'
								name='email'
								value={registerState.email}
								onChange={handleChange}
							/>
							<TextField
								required
								id='5r'
								label='City/Town'
								name='city'
								value={registerState.city}
								onChange={handleChange}
							/>
							<TextField
								required
								id='6r'
								label='Province'
								name='province'
								value={registerState.province}
								onChange={handleChange}
							/>
							<TextField
								required
								id='7r'
								label='Postal Code'
								name='postalCode'
								value={registerState.postalCode}
								onChange={handleChange}
							/>
							<TextField
								required
								id='8r'
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
								id='outlined-password-input2'
								label='Password Confirmation'
								type='password'
								autoComplete='current-password'
								name='passwordConfirmation'
								value={registerState.passwordConfirmation}
								onChange={handleChange}
							/>
						</FormControl>

						<Button
							size='large'
							variant='contained'
							fullWidth
							type='submit'
							sx={{ mt: 5 }}
						>
							Create Account
						</Button>
						{errors &&
							errors.map((err, i) => {
								return <Error key={i} errorMessage={err.message} />;
							})}
					</Box>
				</Box>
			</Modal>
		</div>
	);
}

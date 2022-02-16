import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { UserContext } from "../../Application";
import Error from "../Error";
import axios from "axios";
import { FormGroup, FormControl } from "@mui/material";
import Redirect from "../Redirect";
import { fieldStyles } from "../styles/styles";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 450,
	bgcolor: "background.paper",
	border: "2px solid #000",
	borderRadius: "10px",
	boxShadow: 24,
	p: 10,
};

const formGroupStyle = {
	"& .MuiTextField-root": { flexGrow: 1 },
};

export default function RegisterModal({ open, handleClose, setModalOpen }) {
	const { toggleLoggedIn } = useContext(UserContext);

	const [registerState, setRegisterState] = useState({
		firstName: {
			value: "",
			error: false,
			errorMessage: "",
		},
		lastName: {
			value: "",
			error: false,
			errorMessage: "",
		},
		email: {
			value: "",
			error: false,
			errorMessage: "",
		},
		city: {
			value: "",
			error: false,
			errorMessage: "",
		},
		province: {
			value: "",
			error: false,
			errorMessage: "",
		},
		postalCode: {
			value: "",
			error: false,
			errorMessage: "",
		},
		country: {
			value: "",
			error: false,
			errorMessage: "",
		},
		password: {
			value: "",
			error: false,
			errorMessage: "",
		},
		passwordConfirmation: {
			value: "",
			error: false,
			errorMessage: "",
		},
	});

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);

	const handleChange = e => {
		setErrors(null);
		setRegisterState(prev => ({
			...prev,
			[e.target.name]: {
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

	useEffect(() => {
		const fieldValues = {};

		if (loading) {
			//Reduce to only get values
			for (let key in registerState) {
				fieldValues[key] = registerState[key].value;
			}
			axios
				.post(`http://localhost:8001/user/register`, fieldValues)
				.then(res => {
					res.data.registration.errors.fields &&
						res.data.registration.errors.fields.forEach(field => {
							setRegisterState(prev => ({
								...prev,
								[field.fieldName]: {
									value: prev[field.fieldName].value,
									error: true,
									errorMessage: res.data.registration.errors.message,
								},
							}));
						});

					setErrors(res.data.registration.errors.message);
					res.data.registration.isRegistered &&
						toggleLoggedIn(res.data.registration.user);
				})
				.catch(err => setErrors(err))
				.finally(setLoading(false));
		}
	}, [loading]);


	return (
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
					Create an Account
				</Typography>

				<Box
					component='form'
					sx={{ "& .MuiTextField-root": { m: 1 }, position: "relative" }}
					noValidate
					autoComplete='off'
					onSubmit={handleSubmit}
				>
					{errors && <Error errorMessage={errors} />}
					<FormGroup row sx={formGroupStyle}>
						<TextField
							sx={fieldStyles}
							placeholder='First Name'
							required
							id='r1outlined-required'
							label='First Name'
							value={registerState.firstName.value}
							onChange={handleChange}
							name='firstName'
							error={registerState.firstName.error}
							label={
								registerState.firstName.errorMessage
									? registerState.firstName.errorMessage
									: "First name"
							}
						/>
						<TextField
							sx={fieldStyles}
							required
							placeholder='Last Name'
							id='r2outlined-required'
							label='Last Name'
							name='lastName'
							value={registerState.lastName.value}
							onChange={handleChange}
							error={registerState.lastName.error}
							label={
								registerState.lastName.errorMessage
									? registerState.lastName.errorMessage
									: "Last Name"
							}
						/>
					</FormGroup>
					<FormGroup row sx={formGroupStyle}>
						<TextField
							sx={fieldStyles}
							placeholder='Email'
							fullWidth
							required
							id='r3outlined-required'
							label='Email'
							name='email'
							value={registerState.email.value}
							onChange={handleChange}
							error={registerState.email.error}
							label={
								registerState.email.errorMessage
									? registerState.email.errorMessage
									: "Email"
							}
						/>
					</FormGroup>
					<FormGroup row sx={formGroupStyle} row>
						<TextField
							sx={fieldStyles}
							placeholder='Password'
							required
							id='outlined-password-input3'
							label='Password'
							type='password'
							autoComplete='current-password'
							name='password'
							value={registerState.password.value}
							onChange={handleChange}
							error={registerState.password.error}
							label={
								registerState.password.errorMessage
									? registerState.password.errorMessage
									: "Password"
							}
						/>
						<TextField
							sx={fieldStyles}
							placeholder='Confirm Password'
							required
							id='outlined-password-input4'
							label='Password Confirmation'
							type='password'
							autoComplete='current-password'
							name='passwordConfirmation'
							value={registerState.passwordConfirmation.value}
							onChange={handleChange}
							error={registerState.passwordConfirmation.error}
							label={
								registerState.passwordConfirmation.errorMessage
									? registerState.passwordConfirmation.errorMessage
									: "Password"
							}
						/>
					</FormGroup>
					<FormGroup sx={formGroupStyle} row>
						<TextField
							sx={fieldStyles}
							placeholder='City'
							required
							id='r5outlined-required'
							label='City/Town'
							name='city'
							value={registerState.city.value}
							onChange={handleChange}
							error={registerState.city.error}
							label={
								registerState.city.errorMessage
									? registerState.city.errorMessage
									: "City"
							}
						/>
						<TextField
							sx={fieldStyles}
							placeholder='Province'
							required
							id='r6outlined-required'
							label='Province'
							name='province'
							value={registerState.province.value}
							onChange={handleChange}
							error={registerState.province.error}
							label={
								registerState.province.errorMessage
									? registerState.province.errorMessage
									: "Province"
							}
						/>
					</FormGroup>
					<FormGroup sx={formGroupStyle} row>
						<TextField
							sx={fieldStyles}
							placeholder='Postal Code'
							required
							id='r7outlined-required'
							label='Postal Code'
							name='postalCode'
							value={registerState.postalCode.value}
							onChange={handleChange}
							error={registerState.postalCode.error}
							label={
								registerState.postalCode.errorMessage
									? registerState.postalCode.errorMessage
									: "Postal Code"
							}
						/>
						<TextField
							sx={fieldStyles}
							placeholder='Country'
							required
							id='r8outlined-required'
							label='Country'
							name='country'
							value={registerState.country.value}
							onChange={handleChange}
							error={registerState.country.error}
							label={registerState.country.errorMessage}
							label={
								registerState.country.errorMessage
									? registerState.country.errorMessage
									: "Country"
							}
						/>
					</FormGroup>

					<Button
						size='large'
						variant='contained'
						color='secondary'
						fullWidth
						type='submit'
						sx={{ mt: 5 }}
					>
						Create Account
					</Button>
				</Box>
				<Redirect to='log in' setModalOpen={setModalOpen} />
			</Box>
		</Modal>
	);
}

import React from "react";
import { Box, Alert, TextField, Button } from "@mui/material";

function LoginForm({
	handleSubmit,
	handleChange,
	loading,
	errors,
	fieldStyles,
	loginState,
}) {
	return (
		<Box
			component='form'
			sx={{
				"& .MuiTextField-root": { m: 1 },
				padding: "30px",
				position: "relative",
			}}
			noValidate
			autoComplete='off'
			onSubmit={handleSubmit}
		>
			{errors && (
				<Alert severity='error' sx={{ position: "absolute", top: -20 }}>
					{errors}
				</Alert>
			)}
			<TextField
				sx={fieldStyles}
				placeholder='justine@example.com'
				fullWidth
				required
				id='outlined-required'
				name='email'
				value={loginState.email.value}
				onChange={handleChange}
				error={loginState.email.error}
				label={loginState.email.error ? loginState.email.errorMessage : "Email"}
			/>
			<TextField
				sx={fieldStyles}
				placeholder='Password'
				fullWidth
				required
				id='outlined-password-input'
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
		</Box>
	);
}

export default LoginForm;

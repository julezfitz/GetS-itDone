import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  const [error, setError] = useState(false);

	useEffect(() => {
		

	}, [value]);

	const handleChange = e => {
		const textFieldName = e.target.name;

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
									value={value.password}
									onChange={handleChange}
								/>
							</div>
						</Box>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}

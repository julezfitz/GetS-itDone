import React from "react";
import { Box, Button } from "@mui/material";
import RegisterModal from "../User/Registration/Register";
import LoginModal from "../User/Login";

function LoggedOutNav({
	handleRegisterOpen,
	handleRegisterClose,
	registerOpen,
	loginOpen,
	handleLoginOpen,
	handleLoginClose,
}) {
	return (
		<>
			<Box className='site-nav' sx={{ display: "flex" }} component='nav'>
				<>
					<Button
						key='Login'
						onClick={handleLoginOpen}
						sx={{ my: 2, color: "white", display: "block" }}
					>
						Login
					</Button>
					<LoginModal open={loginOpen} handleClose={handleLoginClose} />
				</>

				<>
					<Button
						key='Register'
						onClick={handleRegisterOpen}
						sx={{ my: 2, display: "block" }}
						color='secondary'
						size='small'
					>
						Register
					</Button>
					<RegisterModal
						open={registerOpen}
						handleClose={handleRegisterClose}
					/>
				</>
			</Box>
		</>
	);
}

export default LoggedOutNav;

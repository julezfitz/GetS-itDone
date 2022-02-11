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
			<Box sx={{ maxWidth: "85px", display: { xs: "none", md: "flex" } }}>
				<>
					<Button
						key='Register'
						onClick={handleRegisterOpen}
						sx={{ my: 2, color: "white", display: "block" }}
					>
						Register
					</Button>
					<RegisterModal
						open={registerOpen}
						handleClose={handleRegisterClose}
					/>
				</>
			</Box>
			<Box sx={{ maxWidth: "150px", display: { xs: "none", md: "flex" } }}>
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
			</Box>
		</>
	);
}

export default LoggedOutNav;

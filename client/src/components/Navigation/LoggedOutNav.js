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
			<Box
				className='site-nav'
				sx={{
					display: "flex",
					background: "rgba(28,28,28,.9)",
					backdropFilter: "blur(30px)",
					width: "500px",
					borderRadius: "60px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
				component='nav'
			>
				<>
					<Button
						key='Login'
						onClick={handleLoginOpen}
						sx={{ my: 2, display: "block" }}
						size={"small"}
						color='primary'
					>
						Login
					</Button>
					<LoginModal open={loginOpen} handleClose={handleLoginClose} />
				</>

				<>
					<Button
						key='Register'
						onClick={handleRegisterOpen}
						sx={{ my: 2, display: "block", ml: 4 }}
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

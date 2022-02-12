import React from "react";
import { Box, Button } from "@mui/material";
import RegisterModal from "../User/Registration/Register";
import LoginModal from "../User/Login";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

function LoggedOutNav({
	handleRegisterOpen,
	handleRegisterClose,
	registerOpen,
	loginOpen,
	handleLoginOpen,
	handleLoginClose,
	setModalOpen
}) {
	return (
		<>
			<Box
				className='site-nav'
				sx={{
					display: "flex",
					background: "rgba(28,28,28,.9)",
					backdropFilter: "blur(20px)",
					width: "500px",
					borderRadius: "60px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginTop: 2,
					padding: "0 1rem",
				}}
				component='nav'
			>
				<Link to={"/"} style={{ marginRight: "3rem", color: "white" }}>
					{/* <Typography variant='h6' noWrap component='div'> */}
					Get S*it Done
					{/* </Typography> */}
				</Link>
				<Box style={{ display: "flex" }}>
					<>
						<Button
							key='Login'
							onClick={() => setModalOpen("logIn")}
							sx={{ my: 2, display: "block" }}
							size={"small"}
							color='primary'
						>
							Login
						</Button>
					</>

					<>
						<Button
							key='Register'
							onClick={() => setModalOpen('register')}
							sx={{ my: 2, display: "block", ml: 2 }}
							color='secondary'
							size='small'
						>
							Register
						</Button>
					</>
				</Box>
			</Box>
		</>
	);
}

export default LoggedOutNav;

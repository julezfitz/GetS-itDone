import React from "react";
import { Box, Button } from "@mui/material";
import RegisterModal from "../../User/Registration/Register";
import LoginModal from "../../User/Login";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Logo from "../Logo";
import LoggedOut from "./LoggedOut";

function NavLeft({
	handleRegisterOpen,
	handleRegisterClose,
	registerOpen,
	loginOpen,
	handleLoginOpen,
	handleLoginClose,
	setModalOpen,
	isLoggedIn,
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
				<Logo />

				{isLoggedIn ? "" : <LoggedOut />}
			</Box>
		</>
	);
}

export default NavLeft;

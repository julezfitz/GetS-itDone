import React from "react";
import { Box, Button } from "@mui/material";
import RegisterModal from "../../User/Registration/Register";
import LoginModal from "../../User/Login";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Logo from "../Logo";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";

function NavLeft({ isLoggedIn }) {
	return (
		<>
			<Box
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
					padding: `${isLoggedIn ? "1rem" : "0 1rem"}`,
				}}
			>
				<Logo />

				{isLoggedIn ? <LoggedIn /> : <LoggedOut />}
			</Box>
		</>
	);
}

export default NavLeft;

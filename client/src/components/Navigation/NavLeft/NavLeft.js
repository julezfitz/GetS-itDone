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
					alignItems: "center",
					justifyContent: "space-between",
					width: `${isLoggedIn ? "auto" : "100%"}`,
				}}
			>
				<Logo />

				{isLoggedIn ? <LoggedIn /> : <LoggedOut />}
			</Box>
		</>
	);
}

export default NavLeft;

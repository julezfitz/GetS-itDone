import React from "react";
import { Box } from "@mui/material";
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

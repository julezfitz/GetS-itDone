import React, { useContext } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@material-ui/styles";
import DotLoader from "react-spinners/DotLoader";
import { UserContext } from "../Application";

function LoadingScreen() {
	const { userPending } = useContext(UserContext);
	const theme = useTheme();

	const loadingScreenStyles = {
		position: "fixed",
		height: "100vh",
		width: "100%",
		backgroundColor: "black",
		zIndex: 999999999,
		top: 0,
		left: 0,
		display: userPending ? "flex" : "none",
		alignItems: "center",
		justifyContent: "center",
	};

	return (
		<Box sx={loadingScreenStyles}>
			<DotLoader color='white' loading='true' size='100px' />
		</Box>
	);
}

export default LoadingScreen;

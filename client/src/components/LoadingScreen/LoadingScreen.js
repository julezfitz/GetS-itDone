import React from "react";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const StyledScreen = styled(Box)(({ theme }) => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

function LoadingScreen() {
	return (
		<StyledScreen>
			<CircularProgress size='6rem' />
		</StyledScreen>
	);
}

export default LoadingScreen;

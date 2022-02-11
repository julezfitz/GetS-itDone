import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const StyledScreen = styled(Box)(({ theme, isActive }) => ({
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	display: `${isActive ? "flex" : "none"}`,
	alignItems: "center",
	justifyContent: "center",
	zIndex: 99999,
	backgroundColor: "blue",
}));

function LoadingScreen({ isActive }) {
	return (
		<StyledScreen isActive={isActive}>
			<CircularProgress size='6rem' />
		</StyledScreen>
	);
}

export default LoadingScreen;

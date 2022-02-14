import React from "react";
import { Box } from "@mui/material";
import DotLoader from "react-spinners/DotLoader";

function LoadingScreen({ isActive }) {
	const loadingScreenStyle = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 99999,
		backgroundColor: "black",
		display: isActive ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center"
	};

	return <Box className='loading-screen' sx={loadingScreenStyle}>
    <DotLoader color="white" width="100px"/>
  </Box>;
}

export default LoadingScreen;

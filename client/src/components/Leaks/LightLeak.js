import React from "react";
import { darkTheme } from "../../styles/globalStyles";

function LightLeak({ blurRadius }) {
	const lightLeakStyles = {
		position: "absolute",
		bottom: "-30vw",
		left: "-15vw",
		height: "50vw",
		width: "50vw",
		backgroundColor: darkTheme.palette.secondary.main,
		borderRadius: `50% || ${blurRadius}`,
		zIndex: 99,
		filter: "blur(10vw)",
	};

	return <div className='light-leak' style={lightLeakStyles}></div>;
}

export default LightLeak;

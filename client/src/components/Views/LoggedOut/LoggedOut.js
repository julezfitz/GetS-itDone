import React from "react";
import HeroSection from "./HeroSection";
import { StyledLoggedOutHome } from "../styles/styles";

function LoggedOutHome() {
	return (
		<StyledLoggedOutHome className='loggedOutHome-wrapper'>
			<HeroSection />
		</StyledLoggedOutHome>
	);
}

export default LoggedOutHome;

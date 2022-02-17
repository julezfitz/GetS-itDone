import React, { useState } from "react";
import HeroSection from "./HeroSection";
import { StyledLoggedOutHome } from "../styles/styles";
import RegisterModal from "../../User/Registration/Register";

function LoggedOutHome() {
	const [isRegisterOpen, setRegisterOpen] = useState(false);

	const toggleRegister = () => {
		setRegisterOpen(!isRegisterOpen);
	};

	return (
		<StyledLoggedOutHome className='loggedOutHome-wrapper'>
			
			<RegisterModal open={isRegisterOpen} handleClose={toggleRegister} />
			<HeroSection toggleRegister={toggleRegister} />
		</StyledLoggedOutHome>
	);
}

export default LoggedOutHome;

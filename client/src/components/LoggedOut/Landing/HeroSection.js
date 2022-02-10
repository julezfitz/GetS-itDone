import React, { useRef, useEffect, useState } from "react";
import { StyledHero } from "../styles/styles";
import gsap from "gsap";
import Scene from "./Spline/Scene";
import { Button } from "@mui/material";

function HeroSection({ toggleRegister }) {
	const marqueeRefs = useRef([]);

	return (
		<StyledHero className='heroSection'>
			<div className='hero-inner'>
				<div className='hero-text'>
					<span className='accent'>Hi</span>, we're get shit done
				</div>
				<Scene />
				<Button
					size='large'
					variant='contained'
					sx={{ textTransform: "none" }}
					onClick={toggleRegister}
				>
					Start now for free
				</Button>
			</div>
		</StyledHero>
	);
}

export default HeroSection;

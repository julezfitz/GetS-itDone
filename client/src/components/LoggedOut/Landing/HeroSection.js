import React, { useRef, useEffect, useState } from "react";
import { StyledHero } from "../styles/styles";
import gsap from "gsap";
import Scene from "./three/Scene";
import { Box } from "@mui/material";
import Typewriter from "typewriter-effect";

function HeroSection({ toggleRegister }) {
	const marqueeRefs = useRef([]);

	return (
		<StyledHero className='heroSection'>
			<div className='hero-inner'>
				<Typewriter
					onInit={typewriter => {
						typewriter

							.typeString("Get shit accomplished.")
							.pauseFor(1500)
							.deleteChars(13)
							.typeString("managed.")
							.pauseFor(1500)
							.deleteChars(8)
							.typeString("delivered.")
							.pauseFor(1500)
							.deleteChars(10)
							.typeString("done.")
							.start();
					}}
					options={{
						autoStart: true,
						deleteSpeed: 4,
					}}
				/>

				<Scene />
			</div>
		</StyledHero>
	);
}

export default HeroSection;

import React from "react";
import { StyledHero } from "../styles/styles";
import Typewriter from "typewriter-effect";
import Scene from "./Spline/Scene";

function HeroSection({ toggleRegister }) {

	return (
		<StyledHero className='heroSection'>
			<div className='hero-text'>
				<Typewriter
					onInit={typewriter => {
						typewriter
							.typeString("Gets it accomplished.")
							.pauseFor(1500)
							.deleteChars(13)
							.typeString("managed.")
							.pauseFor(1500)
							.deleteChars(8)
							.typeString("delivered.")
							.pauseFor(1500)
							.deleteChars(10)
							.typeString("fixed.")
							.pauseFor(1500)
							.deleteChars(6)
							.typeString("done.")
							.pauseFor(1500)
							.start();
					}}
					options={{
						autoStart: true,
						deleteSpeed: 4,
						loop: true,
					}}
				/>
			</div>

			<Scene />
		</StyledHero>
	);
}

export default HeroSection;

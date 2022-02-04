import React from "react";
import { StyledHero, StyledHeroImage } from "../styles/styles";

function HeroImage({ src }) {
	console.log(src)

	return (
		<StyledHeroImage className='floating-image-container'>
			<img src={src} alt='floating-character' className='floating-image'></img>
		</StyledHeroImage>
	);
}

export default HeroImage;

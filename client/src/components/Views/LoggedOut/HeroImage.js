import React from "react";
import floatingCharacter from "../../../assets/images/floating-character.png";
import { StyledHero, StyledHeroImage } from "../styles/styles";

function HeroImage() {
	return (
		<StyledHeroImage className="floating-image-container">
			<img
				src={floatingCharacter}
				alt='floating-character'
				className='floating-image'
			></img>
		</StyledHeroImage>
	);
}

export default HeroImage;

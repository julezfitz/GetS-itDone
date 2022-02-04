import React from "react";
import HeroImage from "./HeroImage";
import { items } from "../../../assets/images/characters/index";

function HeroImages() {
	return (
		<>
			{items.map(item => {
				return <HeroImage src={item} />;
			})}
		</>
	);
}

export default HeroImages;

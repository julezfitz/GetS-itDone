import React from "react";
import HeroImage from "./HeroImage";
import { items } from "../../../assets/images/characters/index";
import Marquee from "react-fast-marquee";

function HeroImages() {
	return (
		<>
			{items.map((item, i) => {
				return <HeroImage src={item} key={i} />;
			})}
		</>
	);
}

export default HeroImages;

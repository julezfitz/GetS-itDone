import React from "react";
import { StyledHero } from "../styles/styles";
import MarqueeBanner from "./MarqueeBanner";
import Line from "../../Line/Line";

function HeroSection() {
	return (
		<StyledHero className='heroSection'>
      <Line/>
			<MarqueeBanner>Get S*it Done</MarqueeBanner>
			<Line />
			<MarqueeBanner direction={"right"}>The Right Way</MarqueeBanner>
			<Line />
		</StyledHero>
	);
}

export default HeroSection;

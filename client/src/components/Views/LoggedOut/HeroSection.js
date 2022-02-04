import React, { useRef, useEffect } from "react";
import { StyledHero } from "../styles/styles";
import MarqueeBanner from "./MarqueeBanner";
import Line from "../../Line/Line";
import LightLeak from "./LightLeak";
import gsap from "gsap";
import { introAnimation } from "./motion/animations";
import HeroImage from "./HeroImage";
import Heading from "../../Heading/Heading";

function HeroSection() {
	const timeline = useRef(gsap.timeline());
	const marqueeRefs = useRef([]);

	const addToRefs = el => {
		if (el && !marqueeRefs.current.includes(el)) {
			marqueeRefs.current.push(el);
		}
	};

	useEffect(() => {
		if (marqueeRefs.current.length >= 2) {
			introAnimation(timeline.current, marqueeRefs.current);
		}
	}, [marqueeRefs]);

	return (
		<StyledHero className='heroSection'>
			
			<MarqueeBanner ref={addToRefs}>Get S*it Done</MarqueeBanner>
	
			
			{/* <LightLeak /> */}
      <HeroImage/>
		</StyledHero>
	);
}

export default HeroSection;

import React, { useRef, useEffect } from "react";
import { StyledHero } from "../styles/styles";
import MarqueeBanner from "./MarqueeBanner";
import Line from "../../Line/Line";
import LightLeak from "./LightLeak";
import gsap from "gsap";
import { introAnimation } from "./motion/animations";
import HeroImage from "./HeroImage";
import Heading from "../../Heading/Heading";
import SplitText from "gsap/SplitText";

function HeroSection() {
	const splitHeading = useRef(null);
	const timeline = useRef(gsap.timeline());
	const marqueeRefs = useRef([]);
	const headingRef = useRef(null);

	const addToRefs = el => {
		if (el && !marqueeRefs.current.includes(el)) {
			marqueeRefs.current.push(el);
		}
	};

	useEffect(() => {
		gsap.registerPlugin(SplitText);

		if (headingRef.current) {
			if (!splitHeading.current) {
				const find = gsap.utils.selector(headingRef.current);
				const heading = find("h1");
				splitHeading.current = new SplitText(heading, {
					type: "words",
					wordsClass: "word",
				});
			}
		}

		if (marqueeRefs.current.length >= 2) {
			introAnimation(timeline.current, marqueeRefs.current);
		}
	}, [marqueeRefs, headingRef]);

	return (
		<StyledHero className='heroSection'>
			<Heading size={"large"} color={"light"} ref={headingRef}>
				Powered by you.
			</Heading>
			<MarqueeBanner ref={addToRefs}>Get S*it Done</MarqueeBanner>

			{/* <LightLeak /> */}
			<HeroImage />
		</StyledHero>
	);
}

export default HeroSection;

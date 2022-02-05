import React, { useRef, useEffect } from "react";
import { StyledHero } from "../styles/styles";
import gsap from "gsap";
import { introAnimation } from "./motion/animations";

import SplitText from "gsap/SplitText";
import { Suspense } from "react";
import Button from "../../Button/Button";
import Blob from "./Three/Blob";
import MarqueeBanner from "./MarqueeBanner";
import Heading from "../../Heading/Heading";

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
				const heading = find("h2");
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
			<Suspense fallback={null}>
				<color attach='background' args={["#223261"]} />
				<Blob />
			</Suspense>
			<div className='text-content'>
				<MarqueeBanner>
					<Heading size="large">Get shit done.</Heading>
				</MarqueeBanner>
			</div>
		</StyledHero>
	);
}

export default HeroSection;

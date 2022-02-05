import React, { useRef, useEffect } from "react";
import { StyledHero } from "../styles/styles";
import gsap from "gsap";
import { introAnimation } from "./motion/animations";

import SplitText from "gsap/SplitText";
import { Suspense } from "react";

import Blob from "./Three/Blob";
import TextOverlay from "./TextOverlay";



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
			<Suspense fallback={<div>Blob loading...</div>}>
				<color attach='background' args={["#223261"]} />
				<Blob />
			</Suspense>
			<TextOverlay/>
			
		</StyledHero>
	);
}

export default HeroSection;

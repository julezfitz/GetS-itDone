import React, { useEffect, useRef } from "react";
import MarqueeBanner from "./MarqueeBanner";
import Heading from "../../Heading/Heading";
import { Arrow, CircleText } from "./Vector/vector";
import Button from "../../Button/Button";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import $ from "jquery";
import { textIntroAnimation } from "./motion/animations";
import Cta from "./Cta";

function TextOverlay() {
	const headingRef = useRef(null);
	const splitRef = useRef(null);
	const animationRef = useRef(gsap.timeline());

	useEffect(() => {
		if (headingRef.current && !splitRef.current) {
			splitRef.current = new SplitText(headingRef.current, {
				type: "lines",
				linesClass: "line",
			});
		}

		if (splitRef.current) {
			splitRef.current.lines.forEach(line => {
				$(line).wrap("<div class='line-wrapper'></div>");
				textIntroAnimation(animationRef.current, splitRef.current.lines);
			});
		}
	}, [headingRef, splitRef]);

	return (
		<div className='text-content-wrapper'>
			<div className='text-content-inner'>
				<Heading size='medium' color='light' ref={headingRef}>
					A people-powered ecosystem. By you, for you.
				</Heading>

				<Cta/>
			</div>
		</div>
	);
}

export default TextOverlay;

import React, { useEffect, useRef } from "react";
import MarqueeBanner from "./MarqueeBanner";
import Heading from "../../Heading/Heading";
import { Arrow, CircleText } from "./Vector/vector";
import Button from "../../Button/Button";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import $ from "jquery";

function TextOverlay() {
	const headingRef = useRef(null);
	const splitRef = useRef(null);

	useEffect(() => {
		if (headingRef.current && !splitRef.current) {
			splitRef.current = new SplitText(headingRef.current, {
				type: "lines",
				linesClass: "line",
			});

			console.log(splitRef.current.lines)
			$(splitRef.current.lines).forEach(line => {
				$(line).wrap("<div class='line-wrapper'></div>");
			})
		}
	}, [headingRef]);

	return (
		<div className='text-content-wrapper'>
			<div className='text-content-inner'>
				<Heading size='medium' color='light' ref={headingRef}>
					A people-powered ecosystem. By you, for you.
				</Heading>

				<Button type='outline' color='light' className='hero-cta'>
					Get started for free.
				</Button>
			</div>
		</div>
	);
}

export default TextOverlay;

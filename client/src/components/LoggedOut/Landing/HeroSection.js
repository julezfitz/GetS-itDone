import React, { useRef, useEffect, useState } from "react";
import { StyledHero } from "../styles/styles";
import gsap from "gsap";
import { Suspense } from "react";
import Blob from "./Three/Blob";
import TextOverlay from "./TextOverlay";

function HeroSection() {
	const splitHeading = useRef(null);
	const timeline = useRef(gsap.timeline());
	const marqueeRefs = useRef([]);
	const headingRef = useRef(null);
	const [mouseCoords, setMouseCoords] = useState({
		mouseX: 0,
		mouseY: 0,
	});
	const [isBlobLoaded, setBlobLoaded] = useState(false);

	const addToRefs = el => {
		if (el && !marqueeRefs.current.includes(el)) {
			marqueeRefs.current.push(el);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setBlobLoaded(true);
		}, 2000);

		const handleMouseMove = e => {
			setMouseCoords({
				mouseX: e.pageX,
				mouseY: e.pageY,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<StyledHero className='heroSection'>
			<Suspense fallback={<div>Blob loading...</div>}>
				<Blob mouseCoords={mouseCoords} />
				{isBlobLoaded && <TextOverlay />}
			</Suspense>
		</StyledHero>
	);
}

export default HeroSection;
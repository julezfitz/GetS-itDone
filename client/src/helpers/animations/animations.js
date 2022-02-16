export const headingAnimation = (timeline, characters) => {
	timeline.to(characters, {
		y: 0,
		opacity: 1,
		stagger: 0.03,
		duration: 0.7,
		ease: "expo.inOut",
	});
	return timeline;
};

import { useEffect, useState } from "react";

export default function useResize() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isResized, setResized] = useState(false);

	useEffect(() => {
		const handleResize = function (e) {
			const innerWidth = window.innerWidth;
			setWindowWidth(innerWidth);
			setResized(true);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			setResized(false);
		};
	}, []);
	return [windowWidth, isResized];
}
import { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import useResize from "./useResize";
import { split } from "lodash";
import $ from "jquery";

function useSplit(arrayOfElements, options) {
	const [splitText, setSplitText] = useState(null);
	const [splitCount, setSplitCount] = useState(0);
	const [isSplit, setIsSplit] = useState(false);
	const [chars, setChars] = useState(null);
	const [words, setWords] = useState(null);
	const [windowWidth] = useResize();
	const [windowWidthChanged, setWindowWidthChanged] = useState(false);

	useEffect(() => {
		gsap.registerPlugin(SplitText);

		console.log(arrayOfElements);

		if (!arrayOfElements || !arrayOfElements[0]) {
			console.log('hi')
			return;
		}

		if (arrayOfElements.length >= 0 && !isSplit) {
			const mySplitText = new SplitText(arrayOfElements, options);
			$(mySplitText.lines).wrap('<div class="line-wrapper"></div>');
			setIsSplit(true);
			setSplitText(mySplitText);
			setSplitCount(1);
			mySplitText.chars && setChars(mySplitText.chars);
			mySplitText.words && setWords(mySplitText.words);
		}
	}, [arrayOfElements]);

	useEffect(() => {
		if (splitText) {
			setSplitText(splitText.revert().split());
			$(splitText.lines).wrap('<div class="line-wrapper"></div>');
			setSplitCount(prev => prev + 1);
		}
	}, [windowWidth]);

	return [isSplit, words, chars, splitCount];
}
export default useSplit;

import Marquee from "react-fast-marquee";
import { forwardRef, useRef, useEffect } from "react";
import { StyledMarquee } from "../../styles/styles";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { introAnimation } from "../motion/animations";

function MarqueeBanner({ children, direction }, ref) {
	return (
		<StyledMarquee className='marquee-wrapper'>
			<Marquee gradient={false} direction={direction} speed={55}>
				{children}
			</Marquee>
		</StyledMarquee>
	);
}

export default forwardRef(MarqueeBanner);

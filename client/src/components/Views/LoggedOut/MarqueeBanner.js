import Marquee from "react-fast-marquee";
import { forwardRef } from "react";
import { StyledMarquee } from "../styles/styles";

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

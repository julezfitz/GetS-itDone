import Marquee from "react-fast-marquee";
import { forwardRef } from "react";
import { StyledMarquee } from "../styles/styles";

function MarqueeBanner({ children, direction }, ref) {
	return (
		<StyledMarquee className='marquee-wrapper'>
			<div className='marquee-wrapper__inner' ref={ref}>
				<Marquee gradient={false} direction={direction} speed={55}>
					{children}
				</Marquee>
			</div>
		</StyledMarquee>
	);
}

export default forwardRef(MarqueeBanner);

import Marquee from "react-fast-marquee";
import { StyledMarquee } from "../styles/styles";

function MarqueeBanner({ children, direction }) {
	return (
		<StyledMarquee className="marquee-wrapper">
			<Marquee gradient={false} direction={direction}>
				{children}
			</Marquee>
		</StyledMarquee>
	);
}

export default MarqueeBanner;

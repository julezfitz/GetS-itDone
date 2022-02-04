import React, {forwardRef} from "react";
import { StyledHeading } from "./styles/styles";

function Heading({ size, color, children }, ref) {
	return (
		<StyledHeading className='heading-wrapper' size={size} color={color} ref={ref}>
			{size === "large" && <h1 className='heading-large'>{children}</h1>}
			{size === "medium" && <h2 className='heading-medium'>{children}</h2>}
			{size === "small" && <h3 className='heading-small'>{children}</h3>}
		</StyledHeading>
	);
}

export default forwardRef(Heading);

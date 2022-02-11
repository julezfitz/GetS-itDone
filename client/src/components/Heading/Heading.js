import React, { forwardRef } from "react";
import { StyledHeading } from "./styles/styles";

function Heading({ size, color, children, className }, ref) {
	return (
		<StyledHeading
			className={`heading-wrapper ${className && className}`}
			size={size}
			color={color}
		>
			<h2>{children}</h2>
		</StyledHeading>
	);
}

export default forwardRef(Heading);

import React, { forwardRef } from "react";
import { StyledHeading } from "./styles/styles";

function Heading(props, ref) {
	return (
		<StyledHeading
			className={`heading-wrapper ${props.className ? props.className : ""}`}
			size={props.size}
			color={props.color}
			style={props.style}
		>
			<h2 ref={ref}>{props.children}</h2>
		</StyledHeading>
	);
}

export default forwardRef(Heading);

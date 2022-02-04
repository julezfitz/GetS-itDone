import React from "react";
import StyledHeading from "./styles/styles";

function Heading({ size, children }) {
	return (
		<div className='heading-wrapper'>
			{size === "large" && <h1 className='heading-large'>{children}</h1>}
			{size === "medium" && <h2 className='heading-medium'>{children}</h2>}
			{size === "small" && <h3 className='heading-small'>{children}</h3>}
		</div>
	);
}

export default Heading;

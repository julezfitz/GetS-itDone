import React from "react";
import { StyledButton } from "./styles";

function Button({ children, type, color }) {
	/* Type can either be solid or outline */
	/* Color can either be "light" or "dark" or "gradient" */

	return (
		<StyledButton className='button' type={type} color={color}>
			{children}
		</StyledButton>
	);
}

export default Button;

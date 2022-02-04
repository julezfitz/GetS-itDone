import React from "react";
import { StyledButton } from "./styles";

function Button({ children, type, color }) {
	/* Style can either be solid or outline */

	return (
		<StyledButton className='button' type={type} color={color}>
			{children}
		</StyledButton>
	);
}

export default Button;

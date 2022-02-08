import React from "react";
import { Alert } from "@mui/material";

function Error({ errorMessage, elementSpacing }) {
	return (
		<Alert severity='error'>
			{errorMessage}
		</Alert>
	);
}

export default Error;

import React from "react";
import { Alert } from "@mui/material";

function Error({ errorMessage, elementSpacing }) {
	return (
		<Alert severity='error' sx={{mt: 2}}>
			{errorMessage}
		</Alert>
	);
}

export default Error;

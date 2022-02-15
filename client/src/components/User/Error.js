import React from "react";
import { Alert } from "@mui/material";

function Error({ errorMessage, elementSpacing }) {
	return (
		<Alert severity='error' sx={{ position: "absolute", top: -35 }}>
			{errorMessage}
		</Alert>
	);
}

export default Error;

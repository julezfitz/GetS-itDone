import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";

function GoogleButton() {
	const responseGoogle = response => {
		console.log(response.details);
	};

	return (
		<GoogleLogin
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			buttonText='Sign in with Google'
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			disabled={false}
		/>
	);
}

export default GoogleButton;

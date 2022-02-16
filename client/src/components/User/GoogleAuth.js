import React from "react";
import GoogleButton from "react-google-button";

function GoogleAuth() {
	const redirectToGoogleSSO = async () => {
		const googleLoginURL = "http://localhost:8001/user/google";
		const newWindow = window.open(
			googleLoginURL,
			"_self",
			"width=500, height=500"
		);
	};

	return <GoogleButton onClick={redirectToGoogleSSO}/>;
}

export default GoogleAuth;

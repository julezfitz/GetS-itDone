import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleButton from "react-google-button";

function GoogleLogIn() {
	const [googleResponse, setGoogleResponse] = useState(null);
	const [googleError, setGoogleError] = useState(null);


	const redirectToGoogleSSO = async () => {
		const googleLoginURL = "http://localhost:8001/user/google";
		const newWindow = window.open(googleLoginURL, "_blank", "width=500,height=600")
	};

	return <GoogleButton onClick={redirectToGoogleSSO} />;
}

export default GoogleLogIn;

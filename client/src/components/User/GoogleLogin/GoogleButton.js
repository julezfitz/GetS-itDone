import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";

function GoogleButton() {
	const [googleResponse, setGoogleResponse] = useState(null);
	const [googleError, setGoogleError] = useState(null);

	

	return <GoogleLogin />;
}

export default GoogleButton;

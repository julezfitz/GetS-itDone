import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";

function GoogleButton() {

  const [googleResponse, setGoogleResponse] = useState(null);
  const [googleError, setGoogleError] = useState(null);

	const responseGoogle = response => {
		response.error ? setGoogleError(response) :
    setGoogleResponse(response)
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

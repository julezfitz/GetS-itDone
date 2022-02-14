import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";

function GoogleButton() {
	const [googleResponse, setGoogleResponse] = useState(null);
	

	const responseGoogle = (response) => {
		setGoogleResponse(response)
	}

	useEffect(() => {
		googleResponse && 
		axios.post('http://localhost:8001/user/google', { googleResponse })
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}, [googleResponse])

	return (
		<GoogleLogin
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			buttonText='Continue with Google'
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={"single_host_origin"}
		/>
	);
}

export default GoogleButton;

import React from "react";
import { Button } from "@mui/material";

function Redirect({ to, closeLogIn, openRegister, setModalOpen }) {
	const buttonStyle = {
		color: "black",
		fontFamily: "inherit",
		fontSize: "inherit",
		display: "inline",
		letterSpacing: "inherit",
	};
	return (
		<div
			className='redirect'
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				marginTop: "1rem",
			}}
		>
			{to === "log in" ? (
				<>
					<span>Already have an account?</span>{" "}
					<Button style={buttonStyle} onClick={() => setModalOpen("logIn")}>
						Log in
					</Button>{" "}
				</>
			) : (
				<>
					<span>Don't have an account?</span>{" "}
					<Button style={buttonStyle} onClick={() => setModalOpen("register")}>
						Sign up
					</Button>{" "}
				</>
			)}
		</div>
	);
}

export default Redirect;

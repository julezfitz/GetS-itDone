import React from "react";
import { Button } from "@mui/material";
// import useTheme from "@mui/material/styles/useTheme";
import { Typography } from "@mui/material";

function Redirect({ to, closeLogIn, openRegister, setModalOpen }) {
	// const theme = useTheme();
	const buttonStyle = {
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
					<Typography variant='body2'>Already have an account?</Typography>
					<Button style={buttonStyle} onClick={() => setModalOpen("logIn")}>
						<Typography variant='body2'>Log in</Typography>
					</Button>{" "}
				</>
			) : (
				<>
					<Typography variant='body2'>Don't have an account?</Typography>
					<Button
						style={buttonStyle}
						variant='naked'
						onClick={() => setModalOpen("register")}
					>
						<Typography variant='body2'>Sign up</Typography>
					</Button>{" "}
				</>
			)}
		</div>
	);
}

export default Redirect;

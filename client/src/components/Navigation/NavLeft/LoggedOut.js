import React, { useContext } from "react";
import { UserContext } from "../../Application";
import { Box, Button } from "@mui/material";
import { useTheme } from "@material-ui/core";

function LoggedOut() {
	const theme = useTheme();
	const { setModalOpen } = useContext(UserContext);

	return (
		<Box style={{ display: "flex" }}>
			<>
				<Button
					key='Login'
					onClick={() => setModalOpen("logIn")}
					sx={{
						my: 2,
						display: "block",
						"&:hover": {
							color: "white",
						},
					}}
					size={"small"}
					color='primary'
				>
					Login
				</Button>
			</>

			<>
				<Button
					key='Register'
					onClick={() => setModalOpen("register")}
					sx={{
						my: 2,
						display: "block",
						ml: 2,
						"&:hover": {
							opacity: 0.8,
							transition: theme.transitions.duration.shortest + " ease",
						},
					}}
					color='secondary'
					size='small'
				>
					Register
				</Button>
			</>
		</Box>
	);
}

export default LoggedOut;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Application from "./components/Application";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";

//Our custom theme
const darkTheme = createTheme({
	palette: {
		primary: {
			main: "rgba(255,255,255,.05)",
		},
		secondary: {
			main: "#ED6E23",
			mainGradient: 'mainGradient: "linear-gradient(45deg, #ED6E23, #EDA224)',
		},
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: { color: "secondary", size: "small" },
					style: {
						textTransform: "none",
						background: `linear-gradient(45deg, #ED6E23, #EDA224)`,
						borderRadius: "60px",
						color: "white",
						padding: "0.4rem 2.3rem",
					},
				},
				{
					props: { variant: "naked" },
					style: {
						color: "black",
						backgroundColor: "none",
						padding: "0px"
					},
				},
				{
					props: { color: "primary", size: "small" },
					style: {
						color: "hsla(0,0%,100%,0.4)",
						background: "rgba(255,255,255,.05)",
						padding: "0.4rem 2.3rem",
					},
				},
			],
			styleOverrides: {
				root: {
					textTransform: "none",
					display: "flex",
					borderRadius: "60px",
					boxShadow: "none"
				},
			},
		},
		MuiAppBar: {
			variants: [
				{
					props: { color: "primary" },
					style: {
						textTransform: "none",
						background: `transparent`,
						boxShadow: "none",
					},
				},
			],
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<Router>
				<Application />
			</Router>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

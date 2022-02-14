import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Application from "./components/Application";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";

//Color variables
const DEEPBLACK = "black";
const OFFBLACK = "#1F1F1F";
const LIGHT = "#FFFFFF";
const GREY = "#999999";
const GRADIENT = "linear-gradient(45deg, #ED6E23, #EDA224)";

//Our custom theme
export const darkTheme = createTheme({
	transitions: {
		easing: {
			// This is the most common easing curve.
			easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
			// Objects enter the screen at full velocity from off-screen and
			// slowly decelerate to a resting point.
			easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
			// Objects leave the screen at full velocity. They do not decelerate when off-screen.
			easeIn: "cubic-bezier(0.4, 0, 1, 1)",
			// The sharp curve is used by objects that may return to the screen at any time.
			sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
		},
		duration: {
			shortest: 150,
			shorter: 200,
			short: 250,
			// most basic recommended timing
			standard: 300,
			// this is to be used in complex animations
			complex: 375,
			// recommended when something is entering screen
			enteringScreen: 225,
			// recommended when something is leaving screen
			leavingScreen: 195,
		},
	},
	typography: {
		fontSize: 13,
		fontWeight: 200,
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		subtitle1: {
			color: GREY,
		},
		h2: {
			color: LIGHT,
		},
		body2: {
			color: `${GREY} !important`,
		},
	},
	palette: {
		text: {
			primary: LIGHT,
			secondary: GREY,
		},
		mode: "dark",
		primary: {
			main: OFFBLACK,
			grey: GREY,
		},
		secondary: {
			main: "#ED6E23",
			mainGradient: GRADIENT,
		},
	},
	overrides: {
		MuiOutlinedInput: {
			input: {
				"&:-webkit-autofill": {
					"-webkit-box-shadow": "none",
					"-webkit-text-fill-color": "#fff",
				},
			},
		},
	},

	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: OFFBLACK,
					backgroundImage: "none",
				},
			},
		},
		MuiButton: {
			variants: [
				{
					props: { color: "secondary", size: "small" },
					style: {
						textTransform: "none",
						background: GRADIENT,
						borderRadius: "60px",
						color: "white",
						padding: "0.4rem 2.3rem",
					},
				},
				{
					props: { variant: "naked" },
					style: {
						color: "white",
						backgroundColor: "none",
						padding: "0px",
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
				{
					props: { color: "secondary", size: "large" },
					style: {
						color: LIGHT,
						background: GRADIENT,
						padding: "0.4rem 2.3rem",
					},
				},
			],
			styleOverrides: {
				root: {
					textTransform: "none",
					display: "flex",
					borderRadius: "60px",
					boxShadow: "none",
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

import { createGlobalStyle } from "styled-components";
import { createTheme } from "@mui/material/styles";

//Color variables
export const DEEPBLACK = "black";
export const OFFBLACK = "#1F1F1F";
export const LIGHT = "#FFFFFF";
export const GREY = "#999999";
export const GRADIENT = "linear-gradient(45deg, #ED6E23, #EDA224)";
export const ORANGE = "#ED6E23";

//Constants
// const GUTTER = "10vw";
export const FOOTERHEIGHT = "64vh";
export const TRANSITION = "300ms ease";

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

  components: {
    MuiBadge: {
      styleOverrides: {
        root: {
          span: {
            backgroundColor: ORANGE,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: OFFBLACK,
          backgroundImage: "none",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          transition: TRANSITION,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: OFFBLACK,
          backgroundImage: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "& .Mui-focused": {
            color: "white",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          background: "transparent",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          transition: "300ms ease",
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

export const GlobalStyles = createGlobalStyle`




.css-1l4gfp6-MuiFormLabel-root-MuiInputLabel-root.Mui-focused, .css-12fpueg-MuiFormLabel-root-MuiInputLabel-root.Mui-focused, .css-1gtw0m2-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
	color: ${GREY};
}

  .accent {
    color: #ED6E23;
  }

  a:hover {
    cursor: pointer;
  }

  body  {
    height: 100%;
    font-family: Inter;
    background-color: #111;
  };


  h1, h2, h3, h4, h5  {
    font-family: Inter;
    color: white;
  }

	

  a {
    text-decoration: none;
    color: inherit;
  }

  section {
    height: 100%;
  }

  main {
		overflow-y: hidden;
		position: relative;
    min-height: 100vh;
    background-color: rgba(17,17,17, 1);
    padding-top: 5rem;
    width: 100%;
    height: 100%; 
    
    padding-bottom: 30vw;
    box-shadow: -3px -5px 48px 4px rgba(0,0,0,.5);
  }

	/*! locomotive-scroll v4.1.3 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */
html.has-scroll-smooth {
  overflow: hidden; }

html.has-scroll-dragging {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; }

.has-scroll-smooth body {
  overflow: hidden; }

.has-scroll-smooth [data-scroll-container] {
  min-height: 100vh; }

[data-scroll-direction="horizontal"] [data-scroll-container] {
  height: 100vh;
  display: inline-block;
  white-space: nowrap; }

[data-scroll-direction="horizontal"] [data-scroll-section] {
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  height: 100%; }

.c-scrollbar {
  position: absolute;
  right: 0;
  top: 0;
  width: 11px;
  height: 100%;
  transform-origin: center right;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0; }
  .c-scrollbar:hover {
    transform: scaleX(1.45); }
  .c-scrollbar:hover, .has-scroll-scrolling .c-scrollbar, .has-scroll-dragging .c-scrollbar {
    opacity: 1; }
  [data-scroll-direction="horizontal"] .c-scrollbar {
    width: 100%;
    height: 10px;
    top: auto;
    bottom: 0;
    transform: scaleY(1); }
    [data-scroll-direction="horizontal"] .c-scrollbar:hover {
      transform: scaleY(1.3); }

.c-scrollbar_thumb {
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
  width: 7px;
  border-radius: 10px;
  margin: 2px;
  cursor: -webkit-grab;
  cursor: grab; }
  .has-scroll-dragging .c-scrollbar_thumb {
    cursor: -webkit-grabbing;
    cursor: grabbing; }
  [data-scroll-direction="horizontal"] .c-scrollbar_thumb {
    right: auto;
    bottom: 0; }
`;

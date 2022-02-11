import { createGlobalStyle } from "styled-components";

const GUTTER = "10vw";

export const GlobalStyles = createGlobalStyle`
  
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&display=swap');
  
  .accent {
    color: orange;
  }

  

  html, body, .App, #root {
    height: 100%;
    font-family: Inter;
  };

  body {
    background-color: ${({ isLoggedIn }) =>
			!isLoggedIn ? "#121215" : "white"};
  }

  h1, h2, h3, h4, h5 , h6 {
    font-family: Inter;
  }


  a {
    text-decoration: none;
    color: inherit;
  }

  section {
    height: 100%;
  }


  .nav-offset {
    margin-top: 4.3rem;
    width: 100%;
    height: 100%; 
  }

 
`;

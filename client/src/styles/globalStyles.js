import { createGlobalStyle } from "styled-components";

const GUTTER = "10vw";

export const GlobalStyles = createGlobalStyle`
  html, body, .App, #root, main {
    height: 100%;
  };


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

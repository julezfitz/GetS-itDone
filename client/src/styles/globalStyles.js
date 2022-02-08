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


  main {
    .content-inner {
      height: 100%;
      padding-top: 4.2rem;
    }
  }

 
`;

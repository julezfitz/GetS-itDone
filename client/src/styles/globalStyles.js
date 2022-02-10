import { createGlobalStyle } from "styled-components";

const GUTTER = "10vw";

export const GlobalStyles = createGlobalStyle`
  html, body, .App, #root, {
    height: 100%;
  };

  body {
    background-color: #15181E;
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
    

    
  }

 .content-width-wrapper {
   margin-top: 10rem;
   width: 1200px;
   margin: 10rem auto 0 auto;
   display: flex;
   flex-direction: column;
   justify-content: center;
   
 }

 
`;

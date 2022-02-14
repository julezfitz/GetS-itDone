import { createGlobalStyle } from "styled-components";
import Kobe from "../assets/fonts/Kobe.woff";
import { DEEPBLACK, FOOTERHEIGHT } from "..";

const GUTTER = "10vw";

export const GlobalStyles = createGlobalStyle`

h1, h2, h3, h4, h5 {
  color: white;
}
  
@font-face {
  font-family: 'Kobe',
  src: url(${Kobe})format('woff');
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
  }

  


  a {
    text-decoration: none;
    color: inherit;
  }

  section {
    height: 100%;
  }

  main {
    min-height: 100vh;
    background-color: rgba(17,17,17, 1);
    padding-top: 4.3rem;
    width: 100%;
    height: 100%; 
    margin-bottom: 100vh;
    padding-bottom: 10rem;
    box-shadow: -3px -5px 48px 4px rgba(0,0,0,.5);
  }



 
`;

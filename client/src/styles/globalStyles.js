import { createGlobalStyle } from "styled-components";
import Kobe from "../assets/fonts/Kobe.woff";

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


  .nav-offset {
    margin-top: 4.3rem;
    width: 100%;
    height: 100%; 
  }

 
`;

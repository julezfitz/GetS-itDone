import { createGlobalStyle } from "styled-components";

const GUTTER = "10vw";

export const GlobalStyles = createGlobalStyle`
  
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&display=swap');
  
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

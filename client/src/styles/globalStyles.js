import { createGlobalStyle } from "styled-components";

const GUTTER = "10vw";

export const GlobalStyles = createGlobalStyle`
  
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&display=swap');
  
  .accent {
    color: orange;
  }

  html, body, .App, #root, {
    height: 100%;
    font-family: 'Inter';
  };

  body {
    background-color: ${({ isLoggedIn }) =>
			!isLoggedIn ? "#15181E" : "white"};
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

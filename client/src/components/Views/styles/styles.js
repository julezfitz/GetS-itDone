import styled from "styled-components";

export const StyledHero = styled.section`
	background-color: black;
	color: white;
  height: 50vw;
	max-height: 100vh;
	font-family: "Helvetica";
	font-size: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

export const StyledMarquee = styled.div`
	padding: 3rem 0;
  overflow: hidden;

  .marquee-wrapper__inner {
    transform: translateY(100%);
    opacity: 0;
    
  }
`;

export const StyledLoggedOutHome = styled.div`
  height: 100%;
  background-color: black;
`

export const StyledLeak = styled.div`
  height: 400px;
  width: 400px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: orange;
  z-index: 9999;
  border-radius: 50%;
  filter: blur(30px)
`

export const StyledHeroImage = styled.div`
  width: 50vw;
  position: absolute;

  img {
    height: 100%;
    width: 100%;
  }
`

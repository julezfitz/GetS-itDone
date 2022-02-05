import styled from "styled-components";
import { keyframes } from "styled-components";
import { device } from "../../../styles/devices/devices";

export const StyledHero = styled.section`
	background-color: white;
	color: white;
	height: 80vh;
	max-height: 100vh;
	font-family: "Helvetica";
	font-size: 10vw;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	overflow: hidden;
	position: relative;

	.heading-wrapper {
		width: auto;
		padding: inherit;
		margin: 5rem 0;

		h1 {
			width: 100%;
			margin: 0;

			.word:nth-of-type(1) {
				z-index: 99999;
			}
		}
	}

	.line {
		width: 80%;
	}

	@media ${device.laptopL} {
		font-size: 10rem;
		.line {
			width: 1200px;
		}
	}
`;

export const StyledMarquee = styled.div`
	width: 100%;
	overflow: hidden;
`;

export const StyledLoggedOutHome = styled.div`
	height: 100%;
	background-color: black;
`;

export const StyledLeak = styled.div`
	height: 400px;
	width: 400px;
	position: absolute;
	top: 0;
	left: 0;
	background-color: orange;
	z-index: 9999;
	border-radius: 50%;
	filter: blur(30px);
`;

export const BounceAnimation = keyframes`
  from {
    transform: translateY(-5%)
  }

  to {
    transform: translateY(5%)
  }
`;

export const StyledHeroImage = styled.div`
	width: 50vw;

	img {
		height: 100%;
		width: 100%;
	}
`;

export const StyledCurve = styled.div`
	width: 100%;
	height: 500px;
	position: relative;
	overflow: hidden;

	.curve-inner {
		width: 18rem;
		height: 70%;
		overflow: hidden;
		position: absolute;
		left: 400px;

		&::before {
			content: "";
			height: 190%;
			width: 500px;
			border: 1px solid white;
			position: absolute;
			top: 0;
			left: -100%;
			border-radius: 60%;
		}
	}
`;
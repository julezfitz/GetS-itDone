import styled from "styled-components";
import { keyframes } from "styled-components";
import { device } from "../../../styles/devices/devices";

//Hero blob config

const heroBgColor = "#223261";
const blobColor = "#7F7CD5";
const blobGradientColors = ["#E2C227", "#F94999", "#5B76CE", "#3CE5D5"];
const blobGradientStops = [0, 0.3, 0.6, 1];

export const blobConfig = {
	heroBgColor,
	blobColor,
	blobGradientColors,
	blobGradientStops,
};

//Page styles

export const StyledHero = styled.section`
	background-color: ${heroBgColor};
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

	.text-content-wrapper {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 100%;

		.text-content-inner {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			position: relative;
			height: 100%;
		}

		.hero-bottom-cta {
			width: 10rem;
			height: 10rem;
			background-color: blue;
			position: absolute;
			bottom: 0;
			
		}

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
	background-color: white;
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

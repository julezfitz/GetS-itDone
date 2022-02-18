import styled from "styled-components";
import { device } from "../../../styles/devices/devices";

//Hero blob config
const heroBgColor = "#232323";
const blobColor = "#7F7CD5";
const blobGradientColors = ["#E2C227", "#F94999", "#5B76CE", "#3CE5D5"];
const blobGradientStops = [0, 0.3, 0.6, 1];
// const heropadding = "0 4rem";

export const blobConfig = {
	heroBgColor,
	blobColor,
	blobGradientColors,
	blobGradientStops,
};

//Bubble button config
// const ctaWidth = "10rem";
// const ctaHeight = "10rem";
// const accentColor = "#ED6E23";
// const transition = "300ms ease";

//Page styles

export const StyledHero = styled.section`
	color: white;
	height: 30vh;

	font-size: 10vw;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	overflow: hidden;
	
	z-index: 999;
	width: 100%;

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	height: 100%;
	width: 100%;
	position: relative;
	z-index: 2;

	.Typewriter {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 5.5rem;
		letter-spacing: -0.1rem;
		font-family: Inter;
		z-index: 999;
		width: 100%;

		.Typewriter__cursor {
			font-family: Helvetica;
			font-weight: lighter;
			opacity: 0.2;
			overflow: hidden;
		}
	}

	button {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		margin-bottom: 4rem;
	}

	.text-content-wrapper {
		z-index: 1;
		width: 100%;
		height: 100%;

		.text-content-inner {
			position: relative;
			height: 100%;
			display: flex;
			justify-content: end;

			.heading-wrapper {
				align-items: center;
				justify-content: center;
				margin: 0;
				width: 50vw;

				.line-wrapper {
					overflow: hidden;

					.line {
						transform: translateY(100%);
						opacity: 0;
					}
				}

				@media ${device.laptopL} {
					width: 700px;
				}

				h2 {
					width: auto;
					margin: 0;
				}
			}

			button {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);

				.circle-text {
					overflow: visible;
					position: absolute;
					width: 100%;
					height: 100%;
					left: 50%;
					top: 50%;
					transform: translate(-54%, -50%);

					path {
						fill: white;
					}
				}
			}
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

export const StyledLoggedOutHome = styled.div`
	height: 80vh;

	.hero-text {
		height: 100%;
		width: 100%;
	}
`;

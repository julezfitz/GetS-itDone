import styled from "styled-components";
import Kobe from "../../../assets/fonts/Kobe.woff";
import Beatrice from "../../../assets/fonts/Beatrice.otf";
import Opposit from "../../../assets/fonts/opposit.otf";
import Cardinal from "../../../assets/fonts/cardinal.otf";

export const StyledHeading = styled.div`
	font-family: Inter;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	font-family: "Opposit";
	font-weight: lighter;
	width: 100%;
	display: flex;
	color: ${({ color }) => {
		return color === "light" ? "white" : "black";
	}};

	.heading-large {
		font-size: 10.5rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: lighter;

		.font-accent {
			font-family: "Cardinal";
		}
	}

	h2 {
		font-size: 6rem;
		letter-spacing: -0.2rem;
		line-height: 6rem;
	}
`;

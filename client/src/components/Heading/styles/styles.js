import styled from "styled-components";
import Kobe from "../../../assets/fonts/Kobe.woff";
import Beatrice from "../../../assets/fonts/Beatrice.otf";

export const StyledHeading = styled.div`
	@font-face {
		font-family: "Haas";
		src: url(${Kobe});
		font-weight: lighter;
	}

	@font-face {
		font-family: "Beatrice";
		src: url(${Beatrice});
		font-weight: lighter;
	}

	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	font-family: "Beatrice";
	font-weight: lighter;
	width: 100%;
	display: flex;
	color: ${({ color }) => {
		return color === "light" ? "white" : "black";
	}};

	.heading-large {
		font-size: 8rem;
	}

	h2 {
		font-size: 7rem;
		line-height: 6rem;
	}
`;

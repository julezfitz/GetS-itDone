import styled from "styled-components";
import Kobe from "../../../assets/fonts/Kobe.woff";
import Beatrice from "../../../assets/fonts/Beatrice.otf";
import Opposit from "../../../assets/fonts/opposit.otf";
import Cardinal from "../../../assets/fonts/cardinal.otf";

export const StyledHeading = styled.div`
	font-family: Inter;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	font-size: 2rem;
	letter-spacing: -2px;
	font-weight: lighter;
	width: 100%;
	display: flex;
	color: ${({ color }) => {
		return color === "light" ? "white" : "black";
	}};

	h2 {
		${({style}) => style && style};
	}
`;

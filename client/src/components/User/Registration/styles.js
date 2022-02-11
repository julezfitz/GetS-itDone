import styled from "styled-components";

export const StyledRegisterPanel = styled.div`
	height: 100%;
	left: 0;
	top: 0;
	position: absolute;
	transition: 500ms ease;

	&:nth-of-type(1) {
		transform: translateX(
			${({ direction }) => (direction === "next" ? "120%" : "0%")}
		);
	}

	&:nth-of-type(2) {
		transform: translateX(
			${({ direction }) => (direction === "next" ? "0" : "-120%")}
		);
	}
`;

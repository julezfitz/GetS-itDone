import styled from "styled-components";

export const StyledLine = styled.div`
	height: 1px;
	background-color: white;
  margin: 0 auto;
	${({ $direction }) => {
		return $direction === "vertical"
			? `
        width: 1px;
        height: 100%;
      `
			: `
      width: 80vw;
      height: 1px;
      `;
	}}
`;

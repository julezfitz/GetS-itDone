import styled from "styled-components";

export const StyledButton = styled.button`
  
  font-size: 0.9rem;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 300ms ease;

  ${({ type, color }) => {
		return type === "solid"
			? `
        background-color: ${color === "light" ? "white" : "black"};
        color: ${color === "light" ? "black" : "white"};
      `
			: `
        background: transparent;
        border: 1px solid ${color === "light" ? "white" : "black"};
        color: ${color === "light" ? "white" : "black"};

        &:hover {
          border: 1px solid ${color === "light" ? "white" : "black"};
          background-color: ${color === "light" ? "white" : "black"};
          color: ${color === "light" ? "black" : "white"};
        }
      `;
	}}

`;

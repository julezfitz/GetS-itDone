import React from "react";
import { StyledLine } from "./styles/StyledLine";

function Line({ direction }) {
	return <StyledLine className='line' $direction={direction}></StyledLine>;
}

export default Line;

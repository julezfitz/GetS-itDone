import React from "react";
import { Bubble } from "./Vector/vector";
import { StyledCallToAction } from "../styles/styles";

//Bubble call to action
function Cta() {
	return (
		<StyledCallToAction className='hero-cta'>
			<button>
				<Bubble />
        <div className="hero-cta--text">
          JOIN FOR FREE
        </div>
			</button>
		</StyledCallToAction>
	);
}

export default Cta;

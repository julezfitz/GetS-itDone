import React from "react";
import Marquee from "react-fast-marquee";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { device } from "../../styles/devices/devices";
import { darkTheme } from "../../styles/globalStyles";

const StyledRails = styled.div`
position: absolute;

bottom: 0;
	.marquee-text {
		color: white;
		font-size: 10vw;
		letter-spacing: -0.3vw;

		@media ${device.desktop} {
			font-size: 200px;
		}
	}
	
	.light-leak {
		position: absolute;
		bottom: -30vw;
		left: -15vw;
		height: 50vw;
		width: 50vw;
		background-color: ${darkTheme.palette.secondary.main};
		border-radius: 50%;
		z-index: 99;
		filter: blur(10vw);
	}
`;

function Rails() {
	return (
		<StyledRails className='marquee-rails'>
			<div className="light-leak"></div>
			<Marquee speed={40} gradient={false} direction='right'>
				<Typography className='marquee-text' component='h2'>
					Contact us.
				</Typography>
			</Marquee>

			<Marquee speed={40} gradient={false} direction='left'>
				<Typography className='marquee-text' component='h2'>
					We get it done.
				</Typography>
			</Marquee>
		</StyledRails>
	);
}

export default Rails;

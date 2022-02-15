import React from "react";
import Marquee from "react-fast-marquee";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { device } from "../../styles/devices/devices";

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
`;

function Rails() {
	return (
		<StyledRails className='marquee-rails'>
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

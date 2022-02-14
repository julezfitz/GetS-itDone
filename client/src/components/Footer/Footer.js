import React from "react";
import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { device } from "../../styles/devices/devices";

const StyledFooter = styled.footer`
	height: 100vh;
	background-color: white;
	position: fixed;
	bottom: 0;
	z-index: -1;
	width: 100%;

	.footer-inner {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	iframe {
		position: absolute;
    height: 100%;
		top: 0;
		left: 0;
		z-index: 99;

    canvas {
      width: 100%;
      height: 100%;
    }
	}

	.marquee-text {
		color: black;
		font-size: 13vw;
		letter-spacing: -0.5vw;

    @media ${device.desktop} {
      font-size: 200px;
    }
	}

	.dev-credits {
		width: 300px;
		padding-right: 10rem;
		padding-bottom: 3rem;
		border-radius: px;
		color: black;
		position: absolute;
		bottom: 0;
		right: 0;

		p {
			word-break: keep-all;
		}
	}
`;

const lineStyle = {
	margin: "0 10rem",
};

function Footer() {
	const theme = useTheme();

	const contactInfo = [
		{
			name: "Brad",
			email: "",
			gitHub: "",
		},
		{
			name: "Julie Fitzpatrick",
			email: "",
			gitHub: "",
		},
		{
			name: "Matt Parisien",
			email: "",
			gitHub: "",
		},
	];

	return (
		<>
			<StyledFooter>
				<div className='footer-inner'>
					{/* <iframe
					src='https://my.spline.design/primitivescopy-c394739b6b3261b8319b0e09d72f5730/'
					frameBorder='0'
					width='100%'
					height='60%'
				></iframe> */}
					<div className='marquee-rails'>
						<hr style={lineStyle}></hr>
						<Marquee speed={40} gradient={false} direction='right'>
							<Typography className='marquee-text' component='h2'>
								Contact us.
							</Typography>
						</Marquee>
						<hr style={lineStyle}></hr>
						<Marquee speed={40} gradient={false} direction='left'>
							<Typography className='marquee-text' component='h2'>
								We get it done.
							</Typography>
						</Marquee>
						<hr style={lineStyle}></hr>
					</div>
				</div>
				<div className='dev-credits'>
					<Typography>
						Designed & developed by <br></br>{" "}
						{contactInfo.map((dev, i) => {
							return (
								<a
									href={dev.gitHub}
									target='_blank'
									className={`credits-${dev.name}__github`}
									style={{
										color: theme.palette.secondary.main,
										fontWeight: "bolder",
										textDecoration: "underline",
									}}
								>
									{i < 1
										? dev.name + ", "
										: i < 2
										? dev.name + " and "
										: dev.name}
								</a>
							);
						})}
					</Typography>
				</div>
			</StyledFooter>
		</>
	);
}

export default Footer;

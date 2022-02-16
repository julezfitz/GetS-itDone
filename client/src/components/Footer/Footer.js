import React from "react";
import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { Typography } from "@mui/material";
import { darkTheme } from "../../styles/globalStyles";
import { device } from "../../styles/devices/devices";

const StyledFooter = styled.footer`
	height: 64vh;
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

	.dev-credits {
		padding-right: 10rem;
		padding-bottom: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: black;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;

		p {
			font-size: 2vw;
			word-break: keep-all;

			@media ${device.desktop} {
				font-size: 3vw;
			}
		}

		.credit {
			transition: 500ms ease;
			position: relative;
			&::after {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 0.34vw;
				content: "";
				background: ${darkTheme.palette.secondary.main};
				transition: 500ms ease;
				transform-origin: right;
			}

			&:hover::after {
				transform: scaleX(0);
				transform-origin: right;
			}

			&:hover {
				color: ${darkTheme.palette.secondary.main};
			}
		}
	}
`;

const lineStyle = {
	margin: "0 10rem",
};

function Footer() {
	const contactInfo = [
		{
			name: "Brad Sawyer",
			email: "",
			gitHub: "https://github.com/BMWSawyer",
		},
		{
			name: "Julie Fitzpatrick",
			email: "",
			gitHub: "https://github.com/julezfitz",
		},
		{
			name: "Matt Parisien",
			email: "",
			gitHub: "https://github.com/mattparisien",
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
				</div>

				<div className='dev-credits'>
					<Typography>
						Designed & developed by{" "}
						{contactInfo.map((dev, i) => {
							return (
								<React.Fragment
									key={Math.random().toString(36).substr(2, 9)}>							>
									<a
										href={dev.gitHub}
										target='_blank'
										className={`credit credit-${dev.name}__github`}
									>
										{dev.name}
									</a>
									{i < 1 ? (
										", "
									) : i < 2 ? (
										<>
											<span> and</span>{" "}
										</>
									) : (
										""
									)}
								</React.Fragment>
							);
						})}
					</Typography>
				</div>
			</StyledFooter>
		</>
	);
}

export default Footer;

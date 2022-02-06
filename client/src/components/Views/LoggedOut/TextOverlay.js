import React from "react";
import MarqueeBanner from "./MarqueeBanner";
import Heading from "../../Heading/Heading";
import { Arrow, CircleText } from "./Vector/vector";
import Button from "../../Button/Button";

function TextOverlay() {
	return (
		<div className='text-content-wrapper'>
			<div className='text-content-inner'>
				<Heading size='medium' color='light'>
					We are a people-powered ecosystem. By you, for you.
				</Heading>

				<Button type='outline' color='light' className='hero-cta'>
					Get started for free.
				</Button>
			</div>
		</div>
	);
}

export default TextOverlay;

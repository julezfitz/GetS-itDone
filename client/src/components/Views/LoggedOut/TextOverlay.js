import React from "react";
import MarqueeBanner from "./MarqueeBanner";
import Heading from "../../Heading/Heading";
import { Arrow, CircleText } from "./Vector/vector";
import Button from "../../Button/Button";

function TextOverlay() {
	return (
		<div className='text-content-wrapper'>
			<div className='text-content-inner'>
				<MarqueeBanner>
					<Heading size='large' color='light'>
						Get it done
					</Heading>
				</MarqueeBanner>

				<Button type='outline' color='light' className='hero-cta'>
					Start now for free
				</Button>
			</div>
		</div>
	);
}

export default TextOverlay;

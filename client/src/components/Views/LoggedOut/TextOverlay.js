import React from "react";
import MarqueeBanner from "./MarqueeBanner";
import Heading from "../../Heading/Heading";
import { Arrow, CircleText } from "./Vector/vector";

function TextOverlay() {
	return (
		<div className='text-content-wrapper'>
			<div className='text-content-inner'>
				<MarqueeBanner>
					<Heading size='large' color='light'>
						Get it done
					</Heading>
				</MarqueeBanner>
				<div className='hero-bottom-cta'>
					<button>
						<Arrow />
            <CircleText/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default TextOverlay;

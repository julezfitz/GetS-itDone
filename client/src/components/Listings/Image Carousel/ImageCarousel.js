import React from "react";
import { Paper, Button } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const images = [
	{
		url: "https://images.pexels.com/photos/10849839/pexels-photo-10849839.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	},
	{
		url: "https://images.pexels.com/photos/11031074/pexels-photo-11031074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	},
	{
		url: "https://images.pexels.com/photos/9921260/pexels-photo-9921260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	},
];

// function ImageItem({ imageUrl }) {
// 	<>
//   	<h1>hi</h1>
//   </>

// 	;
// }

const swiperStyle = {
	height: "100%",
};

function ImageCarousel() {
	return (
		<Swiper style={swiperStyle}>
			{images.map((image, i) => {
				return (
					<SwiperSlide
						style={{
							backgroundImage: `url(${images[0].url})`,
							backgroundSize: "cover",
							backgroundPosition: "50% 50%",
						}}
					></SwiperSlide>
				);
			})}
			<SwiperSlide
				style={{
					backgroundImage: `url(${images[0].url})`,
					backgroundSize: "cover",
					backgroundPosition: "50% 50%",
				}}
			></SwiperSlide>
		</Swiper>
	);
}

export default ImageCarousel;

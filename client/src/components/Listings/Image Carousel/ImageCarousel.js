import React from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// const images = [
// 	{
// 		url: "https://images.pexels.com/photos/10849839/pexels-photo-10849839.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
// 	},
// 	{
// 		url: "https://images.pexels.com/photos/11031074/pexels-photo-11031074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
// 	},
// 	{
// 		url: "https://images.pexels.com/photos/9921260/pexels-photo-9921260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
// 	},
// ];

// function ImageItem({ imageUrl }) {
// 	<>
//   	<h1>hi</h1>
//   </>

// 	;
// }

const swiperStyle = {
	height: "100%",
};

function ImageCarousel({ listing }) {
	SwiperCore.use([Autoplay, Navigation, Pagination]);

	// const prevRef = useRef(null);
	// const nextRef = useRef(null);

	const image1 = listing.image_1;
	const image2 = listing.image_2;
	const image3 = listing.image_3;

	const images = [image1, image2, image3];

	return (
		<Swiper
			style={swiperStyle}
			// onSlideChange={() => console.log("slide change")}
			// onSwiper={swiper => console.log(swiper)}
			autoplay={{ delay: 3000 }}
			pagination={{
				clickable: true,
			}}
		>
			{images.map((image, i) => {
				return (
					image && (
						<SwiperSlide
							key={i}
							style={{
								backgroundImage: `url(${image})`,
								backgroundSize: "cover",
								backgroundPosition: "50% 50%",
							}}
						></SwiperSlide>
					)
				);
			})}
		</Swiper>
	);
}

export default ImageCarousel;

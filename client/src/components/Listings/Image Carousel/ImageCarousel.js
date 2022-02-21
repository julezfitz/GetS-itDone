import React from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const swiperStyle = {
	height: "100%",
};

function ImageCarousel({ listing }) {
	SwiperCore.use([Autoplay, Navigation, Pagination]);

	const image1 = listing.image_1;
	const image2 = listing.image_2;
	const image3 = listing.image_3;

	const images = [image1, image2, image3];

	return (
		<Swiper
			style={swiperStyle}
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

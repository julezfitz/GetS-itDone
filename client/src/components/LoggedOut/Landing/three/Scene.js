import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense } from "react";
import Model from "./Model";

function Scene() {
	return (
		<iframe
			src='https://my.spline.design/untitled-32b0ae3738f4da296b43b5199b80aa4f/'
			frameborder='0'
			width='100%'
			height='100%'
		></iframe>
		// <Suspense fallback={null}>
		// 	<Canvas camera={{ position: [0, 0, 0] }}>
		// 		<Model />
		// 	</Canvas>
		// </Suspense>
	);
}

export default Scene;

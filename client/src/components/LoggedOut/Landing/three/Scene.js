import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense } from "react";
import Model from "./Model";

function Scene() {
	return (
		<Suspense fallback={null}>
			<Canvas camera={{ position: [0, 0, 0] }}>
				<Model />
			</Canvas>
		</Suspense>
	);
}

export default Scene;

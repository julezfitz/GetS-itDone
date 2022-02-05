import React, { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";

function Scene() {
	const gltf = useLoader(GLTFLoader, "/statue.gltf");
	return (
		<Canvas>
			<Suspense fallback={null}>
				<primitive object={gltf.scene} />
			</Suspense>
		</Canvas>
	);
}

export default Scene;

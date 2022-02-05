import React, { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Scene() {
	const gltf = useLoader(GLTFLoader, "/scene.gltf");
	return (
		<Canvas camera={{ position: [0, -40, 20] }}>
			<OrbitControls makeDefault />
			<directionalLight position={[10, 10, 5]} intensity={2} />
			<directionalLight position={[-10, -10, -5]} intensity={1} />
			<primitive position={[0, 0, 0]} object={gltf.scene} scale={0.04}/>
		</Canvas>
	);
}

export default Scene;

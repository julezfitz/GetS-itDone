import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";

function Blob() {
	return (
		<Canvas
			camera={{ position: [0, -40, 20] }}
			colorManagement
			gl={{
				powerPreference: "high-performance",
				alpha: false,
				antialias: false,
				stencil: false,
				depth: false,
			}}
		>
			{/* <OrbitControls makeDefault /> */}
			<directionalLight position={[10, 10, 5]} intensity={2} />
			<directionalLight position={[-10, -10, -5]} intensity={1} />
			<Suspense fallback={null}>
				<Scene />
			</Suspense>
		</Canvas>
	);
}

export default Blob;

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";
import { KeyLight } from "./Lighting";
import {
	EffectComposer,
	DepthOfField,
	Bloom,
	Noise,
	Vignette,
} from "@react-three/postprocessing";

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
			<directionalLight position={[10, 10, 5]} intensity={0.2} />
			<directionalLight position={[-10, -10, -5]} intensity={2} />
			<ambientLight intensity={6} />

			<Suspense fallback={null}>
				<Scene />
			</Suspense>
			<EffectComposer multisampling={0} disableNormalPass={true}>
				<Noise opacity={0.025} />
				<Vignette eskil={false} offset={0.1} darkness={1.1} />
			</EffectComposer>
		</Canvas>
	);
}

export default Blob;

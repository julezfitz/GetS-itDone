import * as THREE from "three";
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
			onCreated={({ gl, scene }) => {
				gl.toneMapping = THREE.ACESFilmicToneMapping;
				gl.outputEncoding = THREE.sRGBEncoding;
				scene.background = new THREE.Color("#373737");
			}}
			gl={{
				powerPreference: "high-performance",
				alpha: false,
				antialias: false,
				stencil: false,
				depth: false,
			}}
		>
			{/* <OrbitControls makeDefault /> */}
			<directionalLight position={[10, 4, 6]} intensity={3} />
			<directionalLight position={[-10, -10, -5]} intensity={4} />
			<ambientLight intensity={4} />
			<pointLight color='white' intensity={1} position={[10, 10, 10]} />
			<Suspense fallback={null}>
				<Scene />
			</Suspense>
			<EffectComposer multisampling={0} disableNormalPass={true}>
				{/* <Noise opacity={0.025} /> */}
				<Vignette eskil={false} offset={0.1} darkness={1.1} />
			</EffectComposer>
		</Canvas>
	);
}

export default Blob;

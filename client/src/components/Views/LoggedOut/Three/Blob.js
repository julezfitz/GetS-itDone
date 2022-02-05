import * as THREE from "three";
import React, { useEffect } from "react";
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
import { Environment } from "@react-three/drei";

function Blob() {
	return (
		<Canvas
			camera={{ position: [0, -40, 20] }}
			colorManagement
			onCreated={({ gl, scene }) => {
				gl.toneMapping = THREE.ACESFilmicToneMapping;
				gl.outputEncoding = THREE.sRGBEncoding;
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
			<directionalLight position={[10, 4, 6]} intensity={0.8} />
			<directionalLight position={[-10, -10, -5]} intensity={0.8} />
			<ambientLight intensity={0.01} />
			<pointLight color='white' intensity={1} position={[10, 10, 10]} />
			<Suspense fallback={null}>
				<Scene />
				<Environment
					background={true} // 
					files={"large_corridor_4k.hdr"}
					path={"/"}
				/>
			</Suspense>
			<EffectComposer multisampling={0} disableNormalPass={true}>
				{/* <Noise opacity={0.025} /> */}
				<Vignette eskil={false} offset={0.1} darkness={1.1} />
			</EffectComposer>
		</Canvas>
	);
}

export default Blob;

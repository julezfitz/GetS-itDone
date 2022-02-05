import * as THREE from "three";
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";
import { Lights } from "./Lighting";
import {
	EffectComposer,
	DepthOfField,
	Bloom,
	Noise,
	Vignette,
} from "@react-three/postprocessing";
import { Environment } from "@react-three/drei";
import { heroBgColor } from "../../styles/styles";

function Blob() {
	return (
		<Canvas
			className='blob-canvas'
			camera={{ position: [0, -40, 20] }}
			colorManagement
			gl={{
				powerPreference: "high-performance",
				antialias: false,
				stencil: false,
				depth: false,
			}}
		>
			{/* <OrbitControls makeDefault /> */}

			<Lights />
			<Suspense fallback={null}>
				<Scene />
				<Environment
					background={false}
					files={"large_corridor_4k.hdr"}
					path={"/"}
				/>
			</Suspense>
			<EffectComposer multisampling={0} disableNormalPass={true}>
				{/* <Noise opacity={0.025} /> */}
			</EffectComposer>
		</Canvas>
	);
}

export default Blob;

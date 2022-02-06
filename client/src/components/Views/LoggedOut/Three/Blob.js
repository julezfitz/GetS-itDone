import * as THREE from "three";
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import { Lights } from "./Lighting";
import { Environment } from "@react-three/drei";

function Blob({ mouseCoords }) {
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
			<Lights />
			<Suspense fallback={null}>
				<Scene mouseCoords={mouseCoords} />
				<Environment
					background={false}
					files={"large_corridor_4k.hdr"}
					path={"/"}
				/>
			</Suspense>
		</Canvas>
	);
}

export default Blob;

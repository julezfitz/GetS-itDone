import React, { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
	EffectComposer,
	DepthOfField,
	Bloom,
	Noise,
	Vignette,
} from "@react-three/postprocessing";
import { MeshDistanceMaterial } from "three";
import { useState } from "react";
import {
	Html,
	Icosahedron,
	useTexture,
	useCubeTexture,
	MeshDistortMaterial,
} from "@react-three/drei";
import { Instances } from "./Model";

function Scene() {
	// const gltf = useLoader(GLTFLoader, "/scene.gltf");

	const bumpMap = '';
	const envMap = '';
	const [material, setMaterial] = useState(null);
	return (
		<>
			<MeshDistortMaterial
				ref={setMaterial}
				envMap={envMap}
				bumpMap={bumpMap}
				color={"orange"}
				roughness={0.1}
				metalness={0.3}
				bumpScale={0.005}
				clearcoat={1}
				clearcoatRoughness={1}
				radius={1}
				distort={0.4}
			/>
			{material && <Instances material={material} />}
		</>
	);
}

export default Scene;

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
import { GradientTexture } from "@react-three/drei";
import { blobColor } from "../../styles/styles";

function Scene() {
	// const gltf = useLoader(GLTFLoader, "/scene.gltf");

	const gradientStops = [0, 0.3, 0.6, 1];
	const gradientColors = ["#E2C227", "#F94999", "#5B76CE", "#3CE5D5"];

	const bumpMap = useTexture("/Scifi_Panels_02_ambientocclusion.jpg");
	const envMap = "";
	const [material, setMaterial] = useState(null);
	return (
		<>
			<MeshDistortMaterial
				ref={setMaterial}
				// color={blobColor}
				bumpMap={bumpMap}
				roughness={0.5}
				metalness={0.9}
				bumpScale={0.009}
				radius={1.2}
				clearcoat={0.9}
				clearcoatRoughness={0.1}
				distort={0.3}
			>
				<GradientTexture
					stops={gradientStops}
					colors={gradientColors}
					size={1024}
				/>
			</MeshDistortMaterial>
			{material && <Instances material={material} />}
		</>
	);
}

export default Scene;

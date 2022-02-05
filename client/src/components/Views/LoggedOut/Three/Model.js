import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	EffectComposer,
	DepthOfField,
	Bloom,
	Noise,
	Vignette,
} from "@react-three/postprocessing";
import {
	Html,
	Icosahedron,
	useTexture,
	useCubeTexture,
	MeshDistortMaterial,
} from "@react-three/drei";

function Model({ material }) {
	const main = useRef();
	// main sphere rotates following the mouse position
	useFrame(({ clock, mouse }) => {
		main.current.rotation.z = clock.getElapsedTime();
		main.current.rotation.y = THREE.MathUtils.lerp(
			main.current.rotation.y,
			mouse.x * Math.PI,
			0.1
		);
		main.current.rotation.x = THREE.MathUtils.lerp(
			main.current.rotation.x,
			mouse.y * Math.PI,
			0.1
		);
	});
	return (
		<Icosahedron
			args={[1, 4]}
			ref={main}
			material={material}
			position={[0, 0, 0]}
			scale={20}
		/>
	);
}

function Instances({ material }) {
	// we use this array ref to store the spheres after creating them
	const [sphereRefs] = useState(() => []);
	// we use this array to initialize the background spheres
	const initialPositions = [
		[-4, 20, -12],
		[-10, 12, -4],
		[-11, -12, -23],
		[-16, -6, -10],
		[12, -2, -3],
		[13, 4, -12],
		[14, -2, -23],
		[8, 10, -20],
	];
	// smaller spheres movement
	useFrame(() => {
		// animate each sphere in the array
		sphereRefs.forEach(el => {
			el.position.y += 0.02;
			if (el.position.y > 19) el.position.y = -18;
			el.rotation.x += 0.06;
			el.rotation.y += 0.06;
			el.rotation.z += 0.02;
		});
	});
	return (
		<>
			<Model material={material} />
			{/* {initialPositions.map((pos, i) => (
				<Icosahedron
					args={[1, 4]}
					position={[pos[0], pos[1], pos[2]]}
					material={material}
					key={i}
					ref={ref => (sphereRefs[i] = ref)}
				/>
			))} */}
		</>
	);
}

export { Model, Instances };

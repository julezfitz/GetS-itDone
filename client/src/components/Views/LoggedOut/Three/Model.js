import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";

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
			args={[1, 10]}
			ref={main}
			material={material}
			position={[0, 0, 0]}
			scale={20}
		/>
	);
}



export { Model };

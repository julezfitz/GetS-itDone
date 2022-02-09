import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Icosahedron } from "@react-three/drei";

function Model({ material, mouseCoords }) {
	const gltf = useLoader(GLTFLoader, "/donut.gltf");

	const main = useRef();
	// main sphere rotates following the mouse position
	useFrame(({ clock, mouse }) => {
		main.current.rotation.z = clock.getElapsedTime();
		main.current.rotation.y = THREE.MathUtils.lerp(
			main.current.rotation.y,
			(mouseCoords.mouseX / 500) * Math.PI,
			0.1
		);
		main.current.rotation.x = THREE.MathUtils.lerp(
			main.current.rotation.x,
			(mouseCoords.mouseY / 500) * Math.PI,
			0.1
		);
	});
	return null;
}

export { Model };

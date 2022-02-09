import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

export function Lights({ brightness, color }) {
	const light = useRef();
	useHelper(light, SpotLightHelper, "cyan");

	return (
		<>
			<pointLight position={[140, 0, 130]} intensity={7} />
			{/* <spotLight position={[-100, 0, -60]} intensity={3} color="blue"/> */}
			{/* <spotLight position={[0, 60, 0]} intensity={3} color='pink' /> */}
			<ambientLight intensity={14} />
		</>
	);
}

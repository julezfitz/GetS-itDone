import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

export function Lights({ brightness, color }) {
	const light = useRef();
	useHelper(light, SpotLightHelper, "cyan");

	return (
		<>
			<pointLight position={[140, 0, 130]} intensity={2} />
			<ambientLight intensity={3} />
		</>
	);
}

import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";
// import { SpotLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { useThree } from "@react-three/fiber";

export function Lights({ brightness, color }) {
	const light = useRef();
	useHelper(light, SpotLightHelper, "cyan");

	return (
		<>
			<pointLight position={[140, 0, 130]} intensity={2} />
			{/* <pointLight position={[-400, -4x0, 20]} intensity={1} color={"#29CC86"} /> */}
			{/* <spotLight
				ref={light}
				position={[-90, -50, 40]}
				color={"white"}
				intensity={0.6}
				penumbra={1}
				decay={2}
				
			/> */}
			{/* <spotLight ref={light} position={[0, 0, 30]} color={"white"} intensity={0.2}  penumbra={1}/> */}
			{/* <pointLight position={[-40, 0, 50]} color={"white"} intensity={0.8}/> */}
			<ambientLight intensity={3} />

			{/* <directionalLight
				position={[0, -40, 20]}
				intensity={4}
				color={"#4843A6"}
			/> */}
		</>
	);
}

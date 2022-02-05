import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { useThree } from "@react-three/fiber";

export const RectAreaLightWithHelper = ({position, color}) => {
	const { scene } = useThree();
}

export function Lights({ brightness, color }) {
	const rectLight = useRef(null);
	useHelper(rectLight, RectAreaLightHelper, "hotpink");
	return (
		<>
			<pointLight position={[0, -40, 20]} intensity={1.3} />
			<pointLight position={[-400, -40, 20]} intensity={1} color={"#29CC86"}/>
		

			{/* <ambientLight intensity={0.2} /> */}
		</>
	);
}

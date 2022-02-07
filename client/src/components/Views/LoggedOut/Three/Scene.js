import React from "react";
import { useState } from "react";
import { useTexture, MeshDistortMaterial } from "@react-three/drei";
import { Model } from "./Model";
import { GradientTexture } from "@react-three/drei";
import { blobConfig } from "../../styles/styles";

function Scene({mouseCoords}) {
	const { blobGradientColors, blobGradientStops } = blobConfig;

	const bumpMap = useTexture("scifi.jpg");
	const [material, setMaterial] = useState(null);
	
	return (
		<>
			<MeshDistortMaterial
				ref={setMaterial}
				// color={blobColor}
				bumpMap={bumpMap}
				roughness={0.9}
				metalness={0.9}
				bumpScale={0.02}
				radius={1.2}
				clearcoat={0.9}
				clearcoatRoughness={0.1}
				distort={0.5}
			>
				<GradientTexture
					stops={blobGradientStops}
					colors={blobGradientColors}
					size={1024}
				/>
			</MeshDistortMaterial>
			{material && <Model material={material} mouseCoords={mouseCoords}/>}
		</>
	);
}

export default Scene;

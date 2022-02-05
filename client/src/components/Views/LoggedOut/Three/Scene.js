import React from "react";
import { useState } from "react";
import { useTexture, MeshDistortMaterial } from "@react-three/drei";
import { Model } from "./Model";
import { GradientTexture } from "@react-three/drei";
import { blobConfig } from "../../styles/styles";

function Scene() {
	const { blobGradientColors, blobGradientStops } = blobConfig;

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
					stops={blobGradientStops}
					colors={blobGradientColors}
					size={1024}
				/>
			</MeshDistortMaterial>
			{material && <Model material={material} />}
		</>
	);
}

export default Scene;

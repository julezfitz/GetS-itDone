export function Lights({ brightness, color }) {
	return (
		<>
			<pointLight position={[0, -40, 20]} intensity={1.3} />
			<directionalLight
				position={[-180, 20, 20]}
				intensity={1}
				color='#3AC9C9'				
				castShadow
			/>

			{/* <ambientLight intensity={0.2} /> */}
		</>
	);
}

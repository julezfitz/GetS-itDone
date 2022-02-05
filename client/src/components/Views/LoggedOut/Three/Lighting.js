export function Lights({ brightness, color }) {
	return (
		<>
			<directionalLight position={[10, 4, 6]} intensity={0.8} />
			<directionalLight position={[-10, -10, -5]} intensity={0.8} />
			<ambientLight intensity={3} />
		</>
	);
}

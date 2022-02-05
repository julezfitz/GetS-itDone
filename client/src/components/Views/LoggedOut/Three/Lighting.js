export function KeyLight({ brightness, color }) {
	return (
		<rectAreaLight
			width={3}
			height={3}
			color={color}
			intensity={brightness}
			position={[10, 10, 5]}
			lookAt={[0, 0, 0]}
			penumbra={1}
		/>
	);
}

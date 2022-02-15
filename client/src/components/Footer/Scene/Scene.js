import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Engine, World, Bodies, Render } from "matter-js";

const StyledScene = styled.div`
	width: 100%;
	height: 100%;
`;

function Scene() {
	const scene = useRef(null);
	const engine = useRef(Engine.create());

	useEffect(() => {
		const cw = document.body.clientWidth;
		const ch = document.body.clientHeight;

		const render = Render.create({
			element: scene.current,
			engine: engine.current,
			options: {
				width: cw,
				height: ch,
				wireframes: false,
				background: "transparent",
			},
		});

		// boundaries
		World.add(engine.current.world, [
			Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
			Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
			Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
			Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
		]);

		// run the engine
		Engine.run(engine.current);
		Render.run(render);

		// unmount
		return () => {
			// destroy Matter
			Render.stop(render);
			World.clear(engine.current.world);
			Engine.clear(engine.current);
			render.canvas.remove();
			render.canvas = null;
			render.context = null;
			render.textures = {};
		};
	}, []);

	return (
		<StyledScene
			onMouseDown={handleDown}
			onMouseUp={handleUp}
			onMouseMove={handleAddCircle}
		>
			<div ref={scene}></div>
		</StyledScene>
	);
}

export default Scene;

import { useEffect, useState } from "react";

function FollowMouse() {
	const [enabled, setEnabled] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMove = (event) => {
			const { clientX, clientY } = event;
			setPosition({ x: clientX, y: clientY });
		};

		if (enabled) {
			window.addEventListener("pointermove", handleMove);
		}

		return () => {
			window.removeEventListener("pointermove", handleMove);
			setPosition({ x: 0, y: 0 });
		};
	}, [enabled]);

	useEffect(() => {
		document.body.classList.toggle("no-cursor", enabled);

		return () => {
			document.body.classList.remove("no-cursor");
		};
	}, [enabled]);

	const className = enabled ? "" : "hidden";

	return (
		<>
			<div
				className={className}
				style={{
					position: "absolute",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					border: "1px solid #fff",
					borderRadius: "50%",
					opacity: 0.8,
					pointerEvents: "none",
					left: -25,
					top: -25,
					width: 50,
					height: 50,
					transform: `translate(${position.x}px, ${position.y}px)`,
				}}
			/>
			<h2>Set focus on mouse</h2>
			<button onClick={() => setEnabled(!enabled)}>
				{enabled ? "Desactivar" : "Activar"}
			</button>
		</>
	);
}

function App() {
	return (
		<main>
			<FollowMouse />
		</main>
	);
}

export default App;

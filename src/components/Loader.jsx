import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};

function Loader() {
	const [loading, setLoading] = useState(true);
	const [color, setColor] = useState("");

	return (
		<div className="sweet-loading">
			<button onClick={() => setLoading(!loading)}></button>
			<input
				type="hidden"
				value={color}
				onChange={(input) => setColor(input.target.value)}
				// placeholder="Color of the loader"
			/>

			<ClipLoader
				color={color}
				loading={loading}
				cssOverride={override}
				size={100}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
}

export default Loader;

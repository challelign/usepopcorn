import React, { useState } from "react";
import Star from "./Star";

const containerStyle = {
	display: "flex",
	alignItems: "center",
	gap: "16px",
};

const starContainerStyle = {
	display: "flex",
};

const StarRating = ({ maxRating = 5, color = "#fcc419", size = 48 }) => {
	const [rating, setRating] = useState(0);
	const [tempRating, setTempRating] = useState(0);

	const handleRating = (rating) => {
		setRating(rating);
	};
	const textStyle = {
		lineHeight: "1",
		margin: "0",
		color,
		fontSize: `${size / 1.5} px`,
	};
	return (
		<div style={containerStyle}>
			<div style={starContainerStyle}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						key={i}
						full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
						onRate={() => handleRating(i + 1)}
						onHoverIn={() => setTempRating(i + 1)}
						onHoverOut={() => setTempRating(0)}
						color={color}
						size={size}
					/>
				))}
			</div>
			<p style={textStyle}>{tempRating || rating || ""}</p>
		</div>
	);
};

export default StarRating;

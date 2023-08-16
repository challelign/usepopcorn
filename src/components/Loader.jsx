import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Loader() {
	const [loading, setLoading] = useState(true);
	const [color, setColor] = useState("");

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				paddingTop: "50px",
			}}
		>
			<CircularProgress color="success" />
		</Box>
	);
}

export default Loader;

import React, { useState } from "react";

const Main = ({ children }) => {
	return (
		<div>
			<main className="main">{children}</main>
		</div>
	);
};

export default Main;

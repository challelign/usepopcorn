import React, { useState } from "react";
import ListBox from "./ListBox ";
import WatchedBox from "./WatchedBox";

const Main = () => {
	return (
		<div>
			<main className="main">
				<ListBox />
				<WatchedBox />
			</main>
		</div>
	);
};

export default Main;

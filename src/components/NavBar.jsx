import React, { useState } from "react";
import Search from "./Search";
import Logo from "./Logo";

const NavBar = () => {
	return (
		<nav className="nav-bar">
			<Logo />
			<Search />
			<NumResults />
		</nav>
	);
};

const NumResults = () => {
	return (
		<p className="num-results">
			Found <strong>X</strong> results
		</p>
	);
};
export default NavBar;

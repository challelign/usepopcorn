import React, { useCallback, useEffect, useRef, useState } from "react";

const Search = ({ query, setQuery }) => {
	// const [query, setQuery] = useState("");
	const inputEl = useRef(null);

	useEffect(() => {
		function callback(e) {
			if (document.activeElement === inputEl.current) {
				return;
			}
			if (e.code === "Enter") {
				inputEl.current.focus();
				setQuery("");
			}
		}
		document.addEventListener("keydown", callback);
		return () => document.addEventListener("keydown", callback);
		// inputEl.current.focus();
	}, [setQuery]);
	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
};

export default Search;

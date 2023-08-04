import React, { useState } from "react";
import Movie from "./Movie";

const MovieList = ({ movies }) => {
	// const [movies, setMovies] = useState(tempMovieData);

	return (
		<ul className="list">
			{movies?.map((movie) => (
				<Movie movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
};

export default MovieList;

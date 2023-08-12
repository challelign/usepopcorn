import React, { useState } from "react";
import Movie from "./Movie";

const MovieList = ({ movies, onSelectMovie }) => {
	// const [movies, setMovies] = useState(tempMovieData);

	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
			))}
		</ul>
	);
};

export default MovieList;

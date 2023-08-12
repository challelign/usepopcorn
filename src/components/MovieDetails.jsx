import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
const KEY = "e4d2ab19";

const MovieDetails = ({ selectedId, onCloseMovie }) => {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;
	const getMovieDetails = async () => {
		try {
			setIsLoading(true);
			const res = await fetch(
				// `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&i=${selectedId}`
				`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
			);
			const data = await res.json();
			setMovie(data);

			setIsLoading(false);
			console.log(data);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getMovieDetails();
	}, [selectedId]);
	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie} movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released}&bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span> {imdbRating}
							</p>
						</div>

						{selectedId}
					</header>
					<section>
						<div className="rating">
							<StarRating maxRating={10} size={24} />
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
};

export default MovieDetails;

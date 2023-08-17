import React, { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
const KEY = "e4d2ab19";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState("");

	// to count userRating click how many time user click to rate the movie
	const countRef = useRef(0);
	useEffect(() => {
		if (userRating) {
			countRef.current = countRef.current + 1;
		}
	}, [userRating]);

	//
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

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;
	// console.log(isWatched);
	const handleAdd = () => {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
			userRating,
			counterRatingDecisions: countRef.current,
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	};
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

	//  to set title for the select movie
	useEffect(() => {
		if (!title) return;
		document.title = `Movie | ${title}`;
		return function () {
			document.title = "usePopcorn";
		};
	}, [title]);

	// to listen key press
	useEffect(() => {
		function callback(e) {
			if (e.code === "Escape") {
				onCloseMovie();
			}
		}
		document.addEventListener("keydown", callback);
		// to clean up key press after removed component
		return function () {
			document.removeEventListener("keydown", callback);
		};
	}, [onCloseMovie]);
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
						{/* {selectedId} */}
					</header>
					<section>
						<div className="rating">
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>

									{userRating > 0 && (
										<button className="btn-add" onClick={handleAdd}>
											+ Add to List
										</button>
									)}
								</>
							) : (
								<p>
									You rated with movie {watchedUserRating} <span>⭐</span>
								</p>
							)}
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

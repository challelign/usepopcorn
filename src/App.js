import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import ListBox from "./components/ListBox ";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
const tempMovieData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0133093",
		Title: "The Matrix",
		Year: "1999",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt6751668",
		Title: "Parasite",
		Year: "2019",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
	},
];

const tempWatchedData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];
const KEY = "e4d2ab19";
export default function App() {
	const [movies, setMovies] = useState(tempMovieData);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [query, setQuery] = useState("inception");

	const [selectedId, setSelectedId] = useState(null);
	const tempQuery = "interstellar";
	/* const fetchMovieDataSearch = () => {
		fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=interstellar`)
			.then((res) => res.json())
			.then((data) => setMovies(data.Search));
	};  
	*/
	// the same as the above function
	const fetchMovieDataSearch = async () => {
		try {
			setIsLoading(true);
			setError("");

			const res = await fetch(
				`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
			);

			if (!res.ok) {
				throw new Error("Something went wrong with fetching  movies!");
			}

			const data = await res.json();
			if (data.Response === "False") {
				throw new Error("Movie not Found !");
			}
			setMovies(data.Search);
			// console.log(movies); //this line of code is empty b/c setMovies cannot set imedatlly to we have to log like this
			console.log(data.Search);
		} catch (error) {
			console.error(error.message);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSelectMovie = (id) => {
		// setSelectedId(id);
		// to make select and unselect
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	};
	const handleCloseMovie = () => {
		setSelectedId(null);
	};
	const handleAddWatched = (movie) => {
		setWatched((watched) => [...watched, movie]);
	};
	const handleDeleteWatched = (id) => {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	};
	useEffect(() => {
		if (query.length < 3) {
			setMovies([]);
			setError("");
			return;
		}
		fetchMovieDataSearch();
	}, [query]);
	return (
		<>
			<NavBar>
				{/*   search and numresult pass as children props */}

				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				{/* List Box is reusable component */}
				{/* all are children props */}
				<ListBox>
					{/*  only  one will run at a time */}
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</ListBox>
				<ListBox>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</ListBox>
			</Main>
		</>
	);
}

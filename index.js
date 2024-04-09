const apiKey = process.env.API_KEY;
import { utils } from './utils';

let movieImdbIDs = [];
let movies = localStorage.getItem('movies')
	? JSON.parse(localStorage.getItem('movies'))
	: [];
const form = document.getElementById('form');
const searchInput = document.getElementById('movie-search');
const moviesListContainer = document.getElementById('movies-list_container');
const moviesListWrapper = document.getElementById('movies-list_wrapper');
const imgTextWrapper = document.getElementById('img-text_wrapper');

const fetchMovies = (searchValue) => {
	return new Promise((resolve, reject) => {
		fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.Search) {
					const movies = data.Search;
					const imdbIDs = movies.map((movie) => movie.imdbID);
					resolve({ movies, imdbIDs });
				} else {
					reject('No movies found');
				}
			})
			.catch((error) => console.log(error));
	});
};

const handleSearch = async (e) => {
	e.preventDefault();
	const searchValue = searchInput.value;

	try {
		const { movies, imdbIDs } = await fetchMovies(searchValue);

		moviesListContainer.innerHTML = '';

		movieImdbIDs = imdbIDs;

		for (let movie of movies) {
			imgTextWrapper.classList.add('hide');
			imgTextWrapper.classList.remove('start');
			moviesListWrapper.classList.remove('start-display');
			moviesListContainer.innerHTML += `
				<div class="img-item">
					<img src=${movie.Poster} alt="poster for ${movie.Title}"/>
					<div class="desc">
						<h3>${movie.Title} <span id="rating-for-${movie.imdbID}">⭐ </span></h3>
						<h5 id="time-genre-for-${movie.imdbID}"></h5>
						<button id="plot-${movie.imdbID}" class="btn-plot">Movie plot</button>
						<p id="plot-for-${movie.imdbID}"></p>
						<a href="https://www.imdb.com/title/${movie.imdbID}/">Check more on <span>IMDb</span></a>
						<button id="${movie.imdbID}"><span class="add-btn">+</span>Watchlist</button>
					</div>
				</div>
				<hr/>
				`;
		}
		showMoviesDetails();
	} catch (error) {
		console.log('Error fetching movies:', error);
	}

	searchInput.value = '';
};

const fetchMovieDetails = (id) => {
	return new Promise((resolve, reject) => {
		fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
			.then((res) => res.json())
			.then((data) => {
				const movieDetails = data;
				resolve({ movieDetails });
			})
			.catch((error) => console.log(error));
	});
};

const showMoviesDetails = async () => {
	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[0]);
		const movieData = {
			id: movieImdbIDs[0],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};
		console.log(movieData);

		const btn = document.getElementById(movieImdbIDs[0]);
		btn.addEventListener('click', () => {
			// localStorage.clear();
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[0])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[0]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[0]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[0])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[0]);
				console.log(movieDetails);
				utils.getElem('plot-for-', movieImdbIDs[0]).innerHTML =
					movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[1]);
		const movieData = {
			id: movieImdbIDs[1],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};

		const btn = document.getElementById(movieImdbIDs[1]);
		btn.addEventListener('click', () => {
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[1])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[1]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[1]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[1])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[1]);
				utils.getElem('plot-for-', movieImdbIDs[1]).innerHTML =
					movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[2]);
		const movieData = {
			id: movieImdbIDs[2],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};

		const btn = document.getElementById(movieImdbIDs[2]);
		btn.addEventListener('click', () => {
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[2])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[2]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[2]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[2])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[2]);
				utils.getElem('plot-for-', movieImdbIDs[2]).innerHTML =
					movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[3]);
		const movieData = {
			id: movieImdbIDs[3],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};

		const btn = document.getElementById(movieImdbIDs[3]);
		btn.addEventListener('click', () => {
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[3])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[3]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[3]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[3])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[3]);
				utils.getElem('plot-for-', movieImdbIDs[3]).innerHTML =
					movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[4]);
		const movieData = {
			id: movieImdbIDs[4],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};

		const btn = document.getElementById(movieImdbIDs[4]);
		btn.addEventListener('click', () => {
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[4])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[4]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[4]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[4])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[4]);
				utils.getElem('plot-for-', movieImdbIDs[4]).innerHTML =
					movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[5]);
		const movieData = {
			id: movieImdbIDs[5],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};

		const btn = document.getElementById(movieImdbIDs[5]);
		btn.addEventListener('click', () => {
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[5])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[5]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[5]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[5])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[5]);
				utils.getElem('plot-for-', movieImdbIDs[5]).innerHTML =
					movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[6]);
		const movieData = {
			id: movieImdbIDs[6],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};

		const btn = document.getElementById(movieImdbIDs[6]);
		btn.addEventListener('click', () => {
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[6])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[6]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[6]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[6])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[6]);
				utils.getElem('plot-for-', movieImdbIDs[6]).innerHTML =
					movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[7]);
		const movieData = {
			id: movieImdbIDs[7],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};

		const btn = document.getElementById(movieImdbIDs[7]);
		btn.addEventListener('click', () => {
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[7])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[7]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[7]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[7])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[7]);
				utils.getElem('plot-for-', movieImdbIDs[7]).innerHTML =
					movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[8]);
		const movieData = {
			id: movieImdbIDs[8],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};

		const btn = document.getElementById(movieImdbIDs[8]);
		btn.addEventListener('click', () => {
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[8])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[8]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[8]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[8])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[8]);
				utils.getElem('plot-for-', movieImdbIDs[8]).innerHTML =
					movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[9]);
		const movieData = {
			id: movieImdbIDs[9],
			title: movieDetails.Title,
			rating: movieDetails.imdbRating,
			runtime: movieDetails.Runtime,
			genre: movieDetails.Genre,
			plot: movieDetails.Plot,
			posterUrl: movieDetails.Poster,
		};

		const btn = document.getElementById(movieImdbIDs[9]);
		btn.addEventListener('click', () => {
			if (
				movies.length > 0 &&
				movies.find((movie) => movie.id === movieImdbIDs[9])
			) {
				return;
			}
			movies.push(movieData);
			localStorage.setItem('movies', JSON.stringify(movies));
		});

		utils.getElem('rating-for-', movieImdbIDs[9]).innerHTML +=
			movieDetails.imdbRating;
		utils.getElem('time-genre-for-', movieImdbIDs[9]).innerHTML =
			movieDetails.Runtime + ' ' + movieDetails.Genre;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	utils
		.getElem('plot-', movieImdbIDs[9])
		.addEventListener('click', async () => {
			try {
				const { movieDetails } = await fetchMovieDetails(movieImdbIDs[9]);
				getElem('plot-for-', movieImdbIDs[9]).innerHTML = movieDetails.Plot;
			} catch (error) {
				console.log('Error fetching movie details:', error);
			}
		});
};

form.addEventListener('submit', handleSearch);

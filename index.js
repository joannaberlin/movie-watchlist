/*
User flow:
- type search word/s in input field
- click the button
- clicking the button -> get search word from input field
and place it in api url to get data (list of movies)
- render the list of movies on the page
*/
const apiKey = process.env.API_KEY;

let movieImdbIDs = [];
let list = [];
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
			// console.log(movie);
			imgTextWrapper.classList.add('hide');
			imgTextWrapper.classList.remove('start');
			moviesListWrapper.classList.remove('start-display');
			moviesListContainer.innerHTML += `
				<div class="img-item">
					<img src=${movie.Poster}/>
					<div class="desc">
						<h3>${movie.Title} ⭐<span id="rating-for-${movie.imdbID}"></span></h3>
						<button id="plot-${movie.imdbID}" class="btn-plot">Movie plot</button>
						<p id="plot-for-${movie.imdbID}"></p>
						<a href="https://www.imdb.com/title/${movie.imdbID}/">Check more on <span>IMDb</span></a>
						<button id="${movie.imdbID}"><span>+</span>Watchlist</button>
					</div>
				</div>
				<hr/>
				`;
		}
	} catch (error) {
		console.log('Error fetching movies:', error);
	}

	searchInput.value = '';
	showMoviesDetails();
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

const getElem = (string, imdbID) => {
	return document.getElementById(string + imdbID);
};

const showMoviesDetails = async () => {
	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[0]);
		getElem('rating-for-', movieImdbIDs[0]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[0]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[0]);
			console.log(movieDetails);
			getElem('plot-for-', movieImdbIDs[0]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[1]);
		getElem('rating-for-', movieImdbIDs[1]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[1]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[1]);
			getElem('plot-for-', movieImdbIDs[1]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[2]);
		getElem('rating-for-', movieImdbIDs[2]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[2]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[2]);
			getElem('plot-for-', movieImdbIDs[2]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[3]);
		getElem('rating-for-', movieImdbIDs[3]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[3]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[3]);
			getElem('plot-for-', movieImdbIDs[3]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[4]);
		getElem('rating-for-', movieImdbIDs[4]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[4]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[4]);
			getElem('plot-for-', movieImdbIDs[4]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[5]);
		getElem('rating-for-', movieImdbIDs[5]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[5]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[5]);
			getElem('plot-for-', movieImdbIDs[5]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[6]);
		getElem('rating-for-', movieImdbIDs[6]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[6]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[6]);
			getElem('plot-for-', movieImdbIDs[6]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[7]);
		getElem('rating-for-', movieImdbIDs[7]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[7]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[7]);
			getElem('plot-for-', movieImdbIDs[7]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[8]);
		getElem('rating-for-', movieImdbIDs[8]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[8]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[8]);
			getElem('plot-for-', movieImdbIDs[8]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[9]);
		getElem('rating-for-', movieImdbIDs[9]).innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	getElem('plot-', movieImdbIDs[9]).addEventListener('click', async () => {
		try {
			const { movieDetails } = await fetchMovieDetails(movieImdbIDs[9]);
			getElem('plot-for-', movieImdbIDs[9]).innerHTML = movieDetails.Plot;
		} catch (error) {
			console.log('Error fetching movie details:', error);
		}
	});
};

/*
const handleSearch = (e) => {
	e.preventDefault();
	const searchValue = searchInput.value;
	let moviesList = [];

	fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}`)
		.then((res) => res.json())
		.then((data) => {
			moviesList = data.Search;

			moviesListContainer.innerHTML = '';

			for (let movie of moviesList) {
				// console.log(movie);
				movieImdbIDs.push(movie.imdbID);
				imgTextWrapper.classList.add('hide');
				imgTextWrapper.classList.remove('start');
				moviesListWrapper.classList.remove('start-display');
				moviesListContainer.innerHTML += `
				<div class="img-item">
					<img src=${movie.Poster}/>
					<div class="desc">
						<h3>${movie.Title}</h3>
						<p>${movie.Year}</p>
						<a href="https://www.imdb.com/title/${movie.imdbID}/">Check more on <span>IMDb</span></a>
						<button id="plot-${movie.imdbID}" class="btn-plot">Movie plot</button>
						<button id="${movie.imdbID}"><span>+</span>Watchlist</button>
					</div>
				</div>
				<hr/>
				`;
			}
		});

	searchInput.value = '';
};

console.log(movieImdbIDs);
*/
form.addEventListener('submit', handleSearch);

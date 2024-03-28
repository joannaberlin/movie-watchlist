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
	showMovieDetails();
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

const showMovieDetails = async () => {
	const ratingSpan = document.getElementById('rating-for-' + movieImdbIDs[0]);
	const plotBtn1 = document.getElementById('plot-' + movieImdbIDs[0]);
	const plotBtn2 = document.getElementById('plot-' + movieImdbIDs[1]);

	try {
		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[0]);
		console.log(movieDetails);
		ratingSpan.innerHTML = movieDetails.imdbRating;
	} catch (error) {
		console.log('Error fetching movie details:', error);
	}

	// plotBtn1.addEventListener('click', async () => {
	// 	try {
	// 		const { movieDetails } = await fetchMovieDetails(movieImdbIDs[0]);
	// 		console.log(movieDetails);
	// 		document.getElementById('plot-for-' + movieImdbIDs[0]).innerHTML =
	// 			movieDetails.Plot;
	// 	} catch (error) {
	// 		console.log('Error fetching movie details:', error);
	// 	}
	// });
	// plotBtn2.addEventListener('click', () => {
	// 	fetchMovieDetails(movieImdbIDs[1]);
	// });
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

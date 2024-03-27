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
	} catch (error) {
		console.log('Error fetching movies:', error);
	}

	searchInput.value = '';
	showMoviePlot();
};

const showMoviePlot = () => {
	const plotBtn1 = document.getElementById('plot-' + movieImdbIDs[0]);

	plotBtn1.addEventListener('click', () => {
		fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieImdbIDs[0]}`)
			.then((res) => res.json())
			.then((data) => console.log(data));
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

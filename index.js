/*
User flow:
- type search word/s in input field
- click the button
- clicking the button -> get search word from input field
and place it in api url to get data (list of movies)
- render the list of movies on the page
*/
const apiKey = process.env.API_KEY;

const form = document.getElementById('form');
const searchInput = document.getElementById('movie-search');
const moviesListContainer = document.getElementById('movies-list_container');
const moviesListWrapper = document.getElementById('movies-list_wrapper');
const imgTextWrapper = document.getElementById('img-text_wrapper');

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
				imgTextWrapper.classList.add('hide');
				imgTextWrapper.classList.remove('start');
				moviesListWrapper.classList.remove('start-display');
				moviesListContainer.innerHTML += `
				<div class="img-item">
					<img src=${movie.Poster}/>
					<div class="desc">
						<h3>${movie.Title}</h3>
						<p>${movie.Year}</p>
						<a href="https://www.imdb.com/title/${movie.imdbID}/">Check more on IMDb</a>
						<button id="${movie.imdbID}">Watchlist</button>
					</div>
				</div>
				<hr/>
				`;
			}
		});
	/*
	todos:
	- create 10 x items, loop data array (10 items) and render each item on the page
	- ex. use the imdbId to redirect to imdb movie page
	- show title, poster, year and link to imdb
	- by imdbID - show movie plot
	*/

	searchInput.value = '';
};

form.addEventListener('submit', handleSearch);

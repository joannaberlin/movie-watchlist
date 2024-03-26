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

const handleSearch = (e) => {
	e.preventDefault();
	const searchValue = searchInput.value;

	fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}`)
		.then((res) => res.json())
		.then((data) => console.log(data));

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

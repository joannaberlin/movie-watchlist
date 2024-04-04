const watchListContainer = document.getElementById('watch-list_container');
const emptyListContainer = document.getElementById('emptyList_wrapper');

let movies = localStorage.getItem('movies')
	? JSON.parse(localStorage.getItem('movies'))
	: [];

console.log(movies);

for (let movie of movies) {
	emptyListContainer.classList.add('hide');
	watchListContainer.innerHTML += `
        <div class="img-item">
            <img src=${movie.posterUrl} alt="poster for ${movie.title}"/>
            <div class="desc">
                <h3>${movie.title} <span id="rating-for-${movie.id}">⭐ ${movie.rating}</span></h3>
                <h5>${movie.genre}</h5>
                <p>${movie.plot}</p>
                <button id="${movie.id}"><span class="add-btn">-</span>Remove</button>
            </div>
        </div>
        <hr/>
        `;
}

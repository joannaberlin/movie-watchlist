const btn = document.getElementById('btn-test');

btn.addEventListener('click', async () => {
	const res = await fetch('http://www.omdbapi.com/?apikey=46e51510&s=blade');
	const data = await res.json();
	console.log(data);
});

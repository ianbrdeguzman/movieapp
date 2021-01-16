const apiURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';


getMovies();

async function getMovies() {
    const response = await fetch(apiURL);
    const data = await response.json();

    showMovies(data.results);
}

const showMovies = (data) => {
   
    for (let key in data) {
        const img = imgPath + data[key].poster_path;
        const title = data[key].original_title;
        const score = data[key].vote_average;
    
        const item  = 
                    `<div class="movie-container">
                        <div class="image-container">
                            <img class="poster" src="${img}" alt="${title}">
                        </div>
                        <div class="info-container">
                            <p class="title">${title}</p>
                            <p class="score">${score}</p>
                        </div>
                    </div>`

    const div = document.body.children[1];

    div.insertAdjacentHTML('beforeend', item);
    }
}






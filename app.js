////////////////////////////
// THE MOVIE DATABASE API //
////////////////////////////

const APIKEY = 'b181c6528b36cb661243b22d4a3fd23a';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=`
const BASE_URL = 'https://image.tmdb.org/t/p/w500';
const DISCOVER = 'https://api.themoviedb.org/3/discover/movie?api_key=b181c6528b36cb661243b22d4a3fd23a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'


getMovies();

async function getMovies() {
    const response = await fetch(DISCOVER);
    const data = await response.json();
    //console.log(data.results)
    showMovies(data.results);
}

const showMovies = (data) => {
    const div = document.body.children[1];

    while (div.firstChild) {
        div.firstChild.remove();
    }
    
    for (let key in data) {
        const img = BASE_URL + data[key].poster_path;
        const title = data[key].title;
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

    div.insertAdjacentHTML('beforeend', item);
    }
}

const searchMovies = async (input) => {
    const response = await fetch(SEARCHAPI + input);
    const data = await response.json();

    showMovies(data.results);
}

document.getElementById('form')
    .addEventListener('submit', (e) =>{

        
    
        const input = document.getElementById('search');
        searchMovies(input.value);
        input.value = '';
        e.preventDefault();
    })



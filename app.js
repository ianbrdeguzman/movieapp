// THE MOVIE DATABASE API
// https://www.themoviedb.org/documentation/api

let page = 1;

// Genre from https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
const genres = [
    {
    "id":28,
    "name":"Action"
    },
    {
    "id":12,
    "name":"Adventure"
    },
    {
    "id":16,
    "name":"Animation"
    },
    {
    "id":35,
    "name":"Comedy"
    },
    {
    "id":80,
    "name":"Crime"
    },
    {
    "id":99,
    "name":"Documentary"
    },
    {
    "id":18,
    "name":"Drama"
    },
    {
    "id":10751,
    "name":"Family"
    },
    {"id":14,
    "name":"Fantasy"
    },
    {"id":36,
    "name":"History"
    },
    {
    "id":27,
    "name":"Horror"
    },
    {"id":10402,
    "name":"Music"
    },
    {
    "id":9648,
    "name":"Mystery"
    },
    {
    "id":10749,
    "name":"Romance"
    },
    {
    "id":878,
    "name":"Science Fiction"
    },
    {
    "id":10770,
    "name":"TV Movie"
    },
    {
    "id":53,
    "name":"Thriller"
    },
    {
    "id":10752,
    "name":"War"
    },
    {
    "id":37,
    "name":"Western"
    }
];

const API_KEY = 'b181c6528b36cb661243b22d4a3fd23a';

const BASE_URL = 'https://image.tmdb.org/t/p/w500';


// call getMovies
getMovies();

// async function
async function getMovies() {

    const API_DIS = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

    // asign fetch response
    const response = await fetch(API_DIS);

    // parse the body text as json and assign to data
    const data = await response.json();

    // call showMovies and pass data.results as parameter
    showMovies(data.results);

    console.log(data)
}

const showMovies = (data) => {

    // select div HTML
    const main = document.body.children[1];

    // check if page is equal to 1
    if(page === 1) {

        // check while div has children
        while (main.firstChild) {

            // remove children
            main.firstChild.remove();
        }
    }

    // check if page is greater than 20;
    if(page > 20) {

        // reset page number
        page = 1;

        // call getMovies
        getMovies();
    }

    // loop over all the key in data
    for (let key in data) {

        // initialize poster url
        const img = BASE_URL + data[key].poster_path;

        // initialize variables
        const id = data[key].id;
        const title = data[key].title;
        const score = data[key].vote_average;
        const vote = data[key].vote_count;
        const overview = data[key].overview;
        const movieGenreId = data[key].genre_ids;

        const movieGenre = lookupGenre(movieGenreId).join(' ');

        // create
        const newMovie  = 
                    `<div class="movie-container">
                        <div class="image-container">
                            <img class="poster" src="${img}" alt="${title}">
                        </div>
                        <div class="overview-container">
                            <h2 class="title">${title}</h2>
                            <p class="genre-content">${movieGenre}</p>
                            <p class="overview-content">${overview}</p>
                            <div class="score-container">
                                <p class="score">${score} <i class="fas fa-star"></i></p>
                                <p class="vote">${vote} <i class="fas fa-poll"></i></p>
                                <p id="id">${id}</p>
                            </div>
                            <button id="check-it">Check it</button>
                        </div>
                    </div>`

    // insert new movie into main container
    main.insertAdjacentHTML('beforeend', newMovie);
    }
}

const lookupGenre = (movieGenreId) => {
    // create a new temp array
    const temp = [];

    // loop each genre
    genres.forEach( (genre) => {

        // loop thru movie genre id
        for (let i = 0; i < movieGenreId.length; i++) {

            // check if movie genre id is equal to genre id array
            if(genre.id === movieGenreId[i]){

                // push genre.name in to temp array
                temp.push(genre.name)

                // break the loop
                break;
            }
        }
    });
    
    // return temp array
    return temp;
};

// searchMovies async function
const searchMovies = async (input) => {

    const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

    // await fetch and assign to response
    const response = await fetch(SEARCHAPI + input);

    // parse body text as json
    const data = await response.json();

    // call showMovies with data.results as parameter
    showMovies(data.results);
}

const searchSpecific = async (input) => {
    const API_CRE = `https://api.themoviedb.org/3/movie/${input}/credits?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(API_CRE);
    const data = await response.json();

    console.log(data);
};

// add event listener to submit form
document.getElementById('form')

    .addEventListener('submit', (e) =>{

        // assign search as input
        const input = document.getElementById('search');

        // call searchMovies function with input as parameter
        searchMovies(input.value);

        // reset input text
        input.value = '';

        // prevent default form submittion
        e.preventDefault();
    })

// add global event listener
window.addEventListener('click', (e) => {

    // if id is equal to load more
    if(e.target.id === 'load-more') {
        // increase page number
        page++;
    
        // call getMovies
        getMovies();
    }

    if(e.target.id === 'check-it') {
        
        const input = e.path[1].childNodes[7].childNodes[5].innerHTML;
        console.log(input)

        searchSpecific(input);
        // create new function to search 
        // https://api.themoviedb.org/3/movie/${input}?api_key=${API_KEY}&language=en-US
    }
});

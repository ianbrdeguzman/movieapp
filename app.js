// THE MOVIE DATABASE API
// https://www.themoviedb.org/documentation/api

const APIKEY = 'b181c6528b36cb661243b22d4a3fd23a';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=`;
const BASE_URL = 'https://image.tmdb.org/t/p/w500';
const DISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const GENREAPI = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US`;

//const genreArray = [];


// call getMovies
getMovies();

// async function
async function getMovies() {

    // asign fetch response
    const response = await fetch(DISCOVER);

    // parse the body text as json and assign to data
    const data = await response.json();

    // call showMovies and pass data.results as parameter
    showMovies(data.results);
    //getGenre();
}

// async function getGenre() {

//     const response = await fetch(GENREAPI);

//     const data = await response.json();
    
//     for (let key in data.genres) {
//         genreArray.push(data.genres[key]);
//     }
    
//     // console.log(genreArray[0].id)
//     // console.log(genreArray[0].name)
// }

const showMovies = (data) => {

    // select div
    const div = document.body.children[1];

    // check while div has children
    while (div.firstChild) {

        // remove children
        div.firstChild.remove();
    }

    // loop over all the key in data
    for (let key in data) {

        // initialize poster url
        const img = BASE_URL + data[key].poster_path;

        // initialize title
        const title = data[key].title;

        // initialize score
        const score = data[key].vote_average;

        // initialize overview
        const overview = data[key].overview;

        // initialize genre id
        const genreId = data[key].genre_ids

        // console.log(genreId[0])
        
        const item  = 
                    `<div class="movie-container">
                        <div class="image-container">
                            <img class="poster" src="${img}" alt="${title}">
                        </div>
                        <div class="info-container">
                            <p class="title">${title}</p>
                            <p class="score">${score}</p>
                        </div>
                        <div class="overview-container">
                            <p class="genre-content">${genreId}</p>
                            <p class="overview-content">${overview}</p>
                        </div>
                    </div>`

    // insert item into div
    div.insertAdjacentHTML('beforeend', item);
    }
}

// serchMovies async function
const searchMovies = async (input) => {

    // await fetch and assign to response
    const response = await fetch(SEARCHAPI + input);

    // parse body text as json
    const data = await response.json();

    // call showMovies with data.results as parameter
    showMovies(data.results);
}

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



require('isomorphic-fetch');
const chalk = require('chalk');

const getActorsForMovie = (movieId) => {

    return fetch(`http://api.themoviedb.org/3/movie/${movieId}/casts?&api_key=6bff2c26600faafe12e5492cbf7d5f4f`)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        });
};

const getCurrentlyPlayingMovies = () => {

    return fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date=${new Date().toISOString().slice(0, 10)}?&api_key=6bff2c26600faafe12e5492cbf7d5f4f`)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        });
};

function printTopTenMovies(movies) {
    movies.results
        .sort((movie1, movie2) => movie2.vote_average - movie1.vote_average)
        .slice(0, 10)
        .forEach(movie => {
            console.log(`
Title: ${movie.title}
Average rating: ${movie.vote_average}
Overview:
${movie.overview}`);
        });    
}

function printMainThreeActors(actors) {
    actors.cast
        .slice(0, 3)
        .forEach(actor => {
            console.log(chalk.bold(`
Character: ${actor.character}
Actor Name: ${actor.name}`));
        });
}

function printTopTenMoviesAndMainThreeActors(movies) {
    printTopTenMovies(movies);
    
    movies.results.forEach(movie => getActorsForMovie(movie.id).then(printMainThreeActors));
}

getCurrentlyPlayingMovies()
    .then(printTopTenMoviesAndMainThreeActors);
    

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

const getTopTenMovies = allMoviesCurrentlyPlaying =>
    allMoviesCurrentlyPlaying.results
        .sort((movie1, movie2) => movie2.vote_average - movie1.vote_average)
        .slice(0, 10);

const printThreeMainActors = allActors => allActors.slice(0, 3)
    .forEach((actor, j) =>
        console.log(`
${j + 1}. ${actor.name}`
        )
    );

const printMovieDetails = (movie, i) => {
    console.log(chalk.red(`
${i + 1}.`));    
    console.log(`
Movie name: ${movie.title}         
Vote average: ${movie.vote_average}
Overview:
${movie.overview}

Top three actors:`);
};

getCurrentlyPlayingMovies()
    .then(moviesCurrentlyPlaying => {
        const topTenMovies = getTopTenMovies(moviesCurrentlyPlaying);
        const getActorsForCurrentlyPlayingMovies = topTenMovies
            .map(function (movie) {
                return getActorsForMovie(movie.id);
            });

        return Promise.all(getActorsForCurrentlyPlayingMovies)
            .then(actorsForAllCurrentlyPlayingMovies => {
                for (let i = 0; i < actorsForAllCurrentlyPlayingMovies.length; i++) {
                    printMovieDetails(topTenMovies[i], i);
                    printThreeMainActors(actorsForAllCurrentlyPlayingMovies[i].cast);
                }
            }).catch(console.log.bind(console));
    });




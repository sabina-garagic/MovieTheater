require('isomorphic-fetch');

const getJSON = (url) => fetch(url)
        .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            });

const getActorsForMovie = (movieId) => getJSON(`http://api.themoviedb.org/3/movie/${movieId}/casts?&api_key=6bff2c26600faafe12e5492cbf7d5f4f`);


const getCurrentlyPlayingMovies = () => getJSON(`https://api.themoviedb.org/3/discover/movie?primary_release_date=${new Date().toISOString().slice(0, 10)}?&api_key=6bff2c26600faafe12e5492cbf7d5f4f`);

const extractTopTenMovies = allMoviesCurrentlyPlaying =>
    allMoviesCurrentlyPlaying
        .sort((movie1, movie2) => movie2.vote_average - movie1.vote_average)
        .slice(0, 10);     

const extractMainThreeActorNames =  allActors => allActors
                                                    .slice(0, 3)
                                                    .map(({name}) => name);
        

const getTopTenMovies = () => {
    return getCurrentlyPlayingMovies()
        .then(({ results: movies }) => extractTopTenMovies(movies))
        .then(topTenMovies => {
            const getActorPromises = topTenMovies.map(movie => getActorsForMovie(movie.id));

            return Promise.all(getActorPromises)
                .then(actorPromisesForAllCurrentlyPlayingMovies => {                    
                    return actorPromisesForAllCurrentlyPlayingMovies
                                .map((movie, i) => Object.assign({}, topTenMovies[i], { mainThreeActors: extractMainThreeActorNames(movie.cast)}));
                })
                .then(top10Movies => top10Movies.map(({ title, overview, vote_average, mainThreeActors }) => ({ title, overview, vote_average, mainThreeActors })));
        });    
};

module.exports = {
    getTopTenMovies
}


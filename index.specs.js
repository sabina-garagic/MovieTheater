const expect = require('expect.js');
const movieTheater = require('./index.js');
const chalk = require('chalk');

describe('movie theater', () => {
    describe('getCurrentlyPlayingMovies', () => {
        it('should get top ten movies ordered by vote_average', () => {
            return movieTheater.getCurrentlyPlayingMovies()
                .then(movies => movies.results                    
                    .sort((movie1, movie2) => movie2.vote_average - movie1.vote_average)
                    .slice(0, 10)
                    .forEach(movie => {
                        console.log(`
                        Title: ${movie.title}
                        Average rating: ${movie.vote_average}
                        Overview:
                        ${movie.overview}`);
                        describe('getMainThreeActors ', () => {
                            it(`should get top three actors from movie ${movie.title}`, () => {

                                return movieTheater.getMainThreeActors(movie.id)
                                    .then(actors => actors.cast
                                        .slice(0, 3)
                                        .forEach(actor => {
                                            console.log(chalk.bold(`
                                            Character: ${actor.character}
                                            Actor Name: ${actor.name}`));
                                        }));
                            });
                        });
                    })
                );
        });

    });   
});
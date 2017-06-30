#! /usr/bin/env node
const { getTopTenMovies } = require('../src/moviedb/moviedb-api-client');
const { printMovieDetails } = require('../src/cli/print-results');

getTopTenMovies()
.then( topTenMovies =>
  printMovieDetails(topTenMovies)
);


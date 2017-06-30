const express = require('express');
const ejs = require('ejs');
const engine = require('ejs-locals');
const { getTopTenMovies } = require('./src/moviedb/moviedb-api-client');

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');  
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => { 
  getTopTenMovies()
    .then(topTenMovies => res.render('pages/top10-movies', {title: 'Top ten movies currently playing:', topTenMovies}))
    .catch(() => {})
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

const printMovieDetails = topTenMovieDetails => {
    topTenMovieDetails.forEach((movieDetail, i) => {
        console.log(`
${i + 1}.
Movie name: ${movieDetail.title}         
Vote average: ${movieDetail.vote_average}
Overview:
${movieDetail.overview}
Top three actors: ${movieDetail.mainThreeActors.join(", ")}
`
        );
    })
};

module.exports = {
  printMovieDetails
}

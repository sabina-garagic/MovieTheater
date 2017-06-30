const expect = require('expect.js');
const { getTopTenMovies } = require('./moviedb-api-client');

describe('movie theater', () => {
    describe('getTopTenMovies', () => {
        let topTenMovies

        beforeEach(() =>
            getTopTenMovies()
                .then(movies => {
                    topTenMovies = movies
                })                        
        );

        it('should get top ten movies', () => {
            expect(topTenMovies.length).to.eql(10);
            expect(topTenMovies[0]).to.only.have.keys('title', 'overview', 'vote_average', 'mainThreeActors');
            expect(topTenMovies[0].mainThreeActors.length).to.be(3);                    
        });        

    });
});





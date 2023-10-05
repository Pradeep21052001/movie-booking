const { Movie } = require('../models/movie.model');


async function findAllMovies(req, res) {
    try {
        const { status, title, genres, artists, start_date, end_date } = req.query;
        let movies = await Movie.find();

        if (status === "PUBLISHED") {
            movies = movies.filter(movie => movie.published === true);
        }
        if (status === "RELEASED") {
            movies = movies.filter(movie => movie.released === true);
        }
        if (title) {
            movies = movies.filter(movie => movie.title.toLowerCase() === title.toLowerCase());
        }
        if (genres) {
            const Genres = genres.split(',');
            movies = movies.filter(movie => {
                return Genres.every(genre => movie.genres.includes(genre));
            });
        }
        if (artists) {
            const Artists = artists.split(',');
            movies = movies.filter(movie => {
                return Artists.every(artist => {
                    return movie.artists.some(artistObj => {
                        const fullName = artistObj.first_name + ' ' + artistObj.last_name;
                        return fullName === artist;
                    });
                });
            });
        }
        if (start_date) {
            const startDate = new Date(start_date);
            movies = movies.filter(movie => {
                const movieReleaseDate = new Date(movie.release_date);
                return movieReleaseDate >= startDate;
            });
        }
        if (end_date) {
            const endDate = new Date(end_date);
            movies = movies.filter(movie => {
                const movieReleaseDate = new Date(movie.release_date);
                return movieReleaseDate <= endDate;
            });
        }
        res.json(movies);

    } catch (err) {
        console.log(err);
    }
}

async function findOne(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        const movies = await Movie.find({ 'movieid': id });
        if (!movies) {
            res.status(404).body(`Movie with id ${req.params.id} not found`);
            return;
        }
        res.json(movies);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    findAllMovies,
    findOne
}
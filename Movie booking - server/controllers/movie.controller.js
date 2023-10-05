const { Movie } = require('../models/movie.model');


async function findAllMovies(req, res) {
    try {
        // console.log(req.headers);
        const { status, title, genres, artists, start_date, end_date } = req.query;
        if (status == undefined) {
            const movies = await Movie.find();
            res.json(movies);
        }
        // else if (status != undefined || title != undefined || genres != undefined || artists != undefined || start_date != undefined || end_date != undefined) {
        //     if (status === 'PUBLISHED') {
        //         const movies = await Movie.find({$and : [{ 'published': true }, { 'title': title }, { 'genres': genres }, { 'artists': artists }]});
        //         res.body(movies);
        //     }
        //     else if (status === 'RELEASED') {
        //         const movies = await Movie.find({$and : [{ 'released': true }, { 'title': title }, { 'genres': genres }, { 'artists': artists }]});
        //         res.body(movies);
        //     }gh
        // }
        else if (status === "PUBLISHED") {
            const movies = await Movie.find({ 'published': true });
            res.json(movies);
        }
        else if (status === "RELEASED") {
            const movies = await Movie.find({ 'released': true });
            res.json(movies);
        }
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
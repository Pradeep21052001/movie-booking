const { Genre } = require('../models/genre.model');

async function findAllGenres(req,res) {
    const genres = await Genre.find();
    res.json(genres);
}

module.exports = { findAllGenres }

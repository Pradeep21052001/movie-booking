const {Artists} = require('../models/artist.model');

async function findAllArtists(req,res) {
    const artists = await Artists.find();
    res.json(artists);
}

module.exports = { findAllArtists }
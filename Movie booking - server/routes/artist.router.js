const { findAllArtists } = require('../controllers/artist.controller');
const express = require("express");
const router = express.Router();

router.get("/artists",findAllArtists);

module.exports = router;
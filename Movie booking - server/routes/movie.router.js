const { findAllMovies, findOne } = require('../controllers/movie.controller');
const express = require("express");
const router = express.Router();

// router.get("/movies", findAllMovies);
router.get("/movies", findAllMovies);
router.get("/movies/:id", findOne);

module.exports = router;
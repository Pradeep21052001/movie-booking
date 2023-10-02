const { findAllGenres } = require('../controllers/genre.controller');
const express = require("express");
const router = express.Router();

router.get("/genres",findAllGenres);


module.exports = router;
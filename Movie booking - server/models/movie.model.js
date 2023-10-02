const mongoose = require("mongoose");

const Movie = mongoose.model(
  "movies",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    }
  })
);

module.exports = { Movie };

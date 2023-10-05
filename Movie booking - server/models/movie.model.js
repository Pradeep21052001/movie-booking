const mongoose = require("mongoose");
const { Artists } = require('./artist.model');


const artistSchema = new mongoose.Schema({
  artistid: Number,
  first_name: String,
  last_name: String,
  wiki_url: String,
  profile_url: String,
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
});


const showSchema = new mongoose.Schema({
  id: Number,
  theatre: {
    name: String,
    city: String
  },
  language: String,
  show_timing: String,
  available_seats: String,
  unit_price: Number
});

const Movie = mongoose.model(
  "movies",
  new mongoose.Schema({
    movieid: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    published: Boolean,
    released: Boolean,
    poster_url: String,
    release_date: String,
    publish_date: String,
    artists: [artistSchema],
    genres: [String],
    duration: Number,
    critic_rating: Number,
    trailer_url: String,
    wiki_url: String,
    story_line: String,
    shows: [showSchema]
  })
);

module.exports = { Movie };

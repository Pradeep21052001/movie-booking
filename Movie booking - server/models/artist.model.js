const mongoose = require('mongoose');

const Artists = mongoose.model(
    "artists",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
          }
    })
)

module.exports = { Artists };
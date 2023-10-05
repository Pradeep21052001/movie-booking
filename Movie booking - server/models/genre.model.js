const mongoose = require('mongoose');

const Genre = mongoose.model(
    "genres",
    new mongoose.Schema({
        genreid: {
            type: Number,
            required: true,
            unique: true
        },
        genre: {
            type: String,
            required: true
        }
    })
)

module.exports = { Genre };


const mongoose = require('mongoose');

const Genre = mongoose.model(
    "genres",
    new mongoose.Schema({
        name : {
            type : String,
            required: true
        }
    })
)

module.exports = { Genre };


const mongoose = require('mongoose');

const Users = mongoose.model(
    "users",
    new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: Number,
            min: 1000000000,
            unique: true,
        }
    })
)

module.exports = { Users }
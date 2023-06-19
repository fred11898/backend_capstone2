const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    dish: {
        type: String,
        required: true
    },
    fruit: {
        type: String,
        required: true
    },
    movie: {
        type: String,
        required: true
    },
    anime: {
        type: String,
        required: true
    },
    pet: {
        type: String,
        required: true
    },
    music: {
        type: String,
        required: true
    },
    person: {
        type: String,
        required: true
    },
    tvSeries: {
        type: String,
        required: true
    },
    celebrity: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Favorites", favoriteSchema);


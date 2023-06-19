const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema ({
    crush: {
        type: String,
        required: true
    },
    firstLove: {
        type: String,
        required: true
    },
    firstRelationship: {
        type: String,
        required: true
    },
    firstKiss: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    ambitions: {
        type: String,
        required: true
    },
    talent: {
        type: String,
        required: true
    },
    themeSong: {
        type: String,
        required: true
    },
    motto: {
        type: String,
        required: true
    },
    moment: {
        type: String,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model("Confession", confessionSchema);
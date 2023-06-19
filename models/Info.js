const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String,
    },
    last_name: {
        type: String,
        required: true
    },
    suffix: {
        type: String
    },
    nickname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    favorites: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Favorites"
    },
    confession: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Confession"
    },
    socialMedia: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SocialMedia"
    },
    toOwner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ToOwner"
    },
},{timestamps: true});


module.exports = mongoose.model("Info", infoSchema);
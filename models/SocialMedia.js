const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema({
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    twitter: {
        type: String
    },
});

module.exports = mongoose.model("SocialMedia", socialMediaSchema);
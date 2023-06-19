const mongoose = require("mongoose");

const ToOwnwerSchema = new mongoose.Schema({
    unforgettable: {
        type: String,
        required: true
    },
    likes: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("ToOwner", ToOwnwerSchema);
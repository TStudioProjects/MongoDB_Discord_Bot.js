const mongoose = require("mongoose");

const profile = mongoose.Schema({
    userTag: { type: String, require: true, unique: true },
    userId: { type: String, require: true, unique: true },
    serverId: { type: String, require: true },
});

const model = mongoose.model("ProfileModels", profile);
module.exports = model;

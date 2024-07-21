    // models/authModel.js
    const mongoose = require("mongoose");

    const authSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, unique: true },
    });

    module.exports = mongoose.model('Auth', authSchema);

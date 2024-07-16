// models/nameModel.js
const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

module.exports = mongoose.model('Name', nameSchema);

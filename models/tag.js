const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  noun: { type: String, unique: true }
});

module.exports = mongoose.model('Tag', tagSchema);

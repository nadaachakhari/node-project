const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  gender: { type: String, required: true},
  language: { type: String, required: true},
  nombreDePages: { type: Number, required: false},
  resume: { type: String, required: false},
});

module.exports = mongoose.model('Book', bookSchema);
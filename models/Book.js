const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  gender: { type: String, required: true},
  language: { type: String, required: true},
  nombreDePages: { type: Number, required: false},
  resume: { type: String, required: false},
  author: { type: Schema.Number.Types.ObjectId, ref: "Author",
            required: true,},

  //ref pour nom de model
});

module.exports = mongoose.model('Book', bookSchema);
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = mongoose.Schema({
  name: {
      type: String,
      enum: ['Horror', 'Mystery', 'Fiction', 'Science Fiction', 'Romance', 'Fantasy', 'Non-fiction', 
      'Thriller', 'Biography', 'Adventure', 'Drama'],
      required: true
  }
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
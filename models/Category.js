const mongoose = require("mongoose")
const CategorySchema = mongoose.Schema({
    title: String,
    enum: ["Horror", "Mystery", "Science Fiction", "Fantasy", "Romance", "Non-Fiction"],
    required: true,
})

module.exports = mongoose.model("Category", CategorySchema)
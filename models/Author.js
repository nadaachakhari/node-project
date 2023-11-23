const mongoose = require("mongoose")
const idValidator = require('mongoose-id-validator')
const Schema = mongoose.Schema
const AuthorSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    nationality: { type: String, required: false },
    //books :[{type:Schema.Types.ObjectId,ref:"Books"}],

})


// Appliquer le plugin mongoose-id-validator pour valider la relation
AuthorSchema.plugin(idValidator);

module.exports = mongoose.model("Author", AuthorSchema)
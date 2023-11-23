const mongoose = require('mongoose')
const Schema = mongoose.Schema
const idValidator = require('mongoose-id-validator')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  //author: { type: String, required: true },
  year: { type: Number, required: true },
  language: { type: String, required: true },
  nombreDePages: { type: Number, required: false },
  resume: { type: String, required: false },
  author: { type: Schema.Types.ObjectId, ref: "Author" , required: true},  // Modification: Utiliser "authorId" au lieu de "Author"
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }]
});
bookSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId }).populate('category').exec();
};

// Appliquer le plugin mongoose-id-validator pour valider la relation
bookSchema.plugin(idValidator);


// Ajouter des validateurs pour le modèle de livre
bookSchema.path('title').validate(function(value) {
  // Ajoutez ici votre propre logique de validation pour le titre
  return value.length > 0; // Exemple de validation : le titre doit avoir une longueur supérieure à 0
}, 'Le titre du livre ne peut pas être vide');

module.exports = mongoose.model('Book', bookSchema);

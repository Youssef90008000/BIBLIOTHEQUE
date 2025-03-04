const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  cover: { type: String },
  title: { type: String },
  author: { type: String },
  description: { type: String },
  publication_date: { type: Date },
  genre: { type: Array },
  ISBN: { type: String },
  pages: { type: Number },
  language: { type: String },
  publisher: { type: String },
  format: { type: String },
  dimensions: { type: Object },
  rating: { type: Number },
});

// Vérifier si le modèle "Book" a déjà été compilé
module.exports = mongoose.models.Book || mongoose.model("Book", BookSchema);

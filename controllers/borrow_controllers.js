const Borrow = require('../models/borrow_models');  // Modèle Mongoose pour les emprunts
const User = require('../models/user_models');      // Modèle Mongoose pour les utilisateurs
const Book = require('../models/book_models');      // Modèle Mongoose pour les livres

// Récupérer tous les emprunts avec les détails des utilisateurs et des livres
exports.getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find().populate('user').populate('book');
    res.render("pages/borrows", { borrows });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des emprunts", error: error.message });
  }
};

// Afficher la page pour ajouter un emprunt
exports.addBorrowPage = async (req, res) => {
  try {
    const users = await User.find();
    const books = await Book.find();
    res.render("pages/borrows-create", { users, books });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs et des livres", error: error.message });
  }
};

// Ajouter un nouvel emprunt
exports.addBorrow = async (req, res) => {
  try {
    const { user, book, date_borrow, date_return } = req.body;

    // Vérification des champs requis
    if (!user || !book || !date_borrow || !date_return) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    // Vérification si l'utilisateur et le livre existent
    const foundUser = await User.findById(user);
    const foundBook = await Book.findById(book);

    if (!foundUser || !foundBook) {
      return res.status(404).json({ message: "Utilisateur ou livre introuvable." });
    }

    // Création de l'emprunt
    const newBorrow = new Borrow({
      user: foundUser._id,
      book: foundBook._id,
      date_borrow: new Date(date_borrow),
      date_return: new Date(date_return),
      status: "borrowed",    // Statut initial
      is_deleted: false,     // Le livre n'est pas supprimé
      is_returned: false,    // Le livre n'a pas encore été retourné
      is_valid: true         // L'emprunt est valide
    });

    // Sauvegarde dans la base de données
    await newBorrow.save();

    // Redirection vers la page des emprunts
    res.redirect('/bibliotheque/borrows');
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'emprunt:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

const Borrow = require("../models/borrow_models"); // Modèle Mongoose pour les emprunts
const User = require("../models/user_models"); // Modèle Mongoose pour les utilisateurs
const Book = require("../models/book_models"); // Modèle Mongoose pour les livres

// Récupérer tous les emprunts avec les détails des utilisateurs et des livres
exports.getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find().populate("user").populate("book");
    res.render("pages/borrows", { borrows });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des emprunts",
        error: error.message,
      });
  }
};

// Afficher la page pour ajouter un emprunt
exports.addBorrowPage = async (req, res) => {
  try {
    const users = await User.find();
    const books = await Book.find();
    res.render("pages/borrows-create", { users, books });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Erreur lors de la récupération des utilisateurs et des livres",
        error: error.message,
      });
  }
};

// Ajouter un nouvel emprunt
exports.addBorrow = async (req, res) => {
  try {
    const { user, book, date_borrow, date_return } = req.body;

    // Vérification des champs requis
    if (!user || !book || !date_borrow || !date_return) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }

    // Vérification si l'utilisateur et le livre existent
    const foundUser = await User.findById(user);
    const foundBook = await Book.findById(book);

    if (!foundUser || !foundBook) {
      return res
        .status(404)
        .json({ message: "Utilisateur ou livre introuvable." });
    }

    // Création de l'emprunt
    const newBorrow = new Borrow({
      user: foundUser._id,
      book: foundBook._id,
      date_borrow: new Date(date_borrow),
      date_return: new Date(date_return),
      status: "En cours",
      is_deleted: false,
      is_returned: false,
      is_valid: true,
    });

    // Sauvegarde dans la base de données
    await newBorrow.save();

    // Redirection vers la page des emprunts
    res.redirect("/pages/borrows-create");
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'emprunt:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
exports.addBorrowUser = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const bookId = req.params.id;
    const { date_borrow, date_return } = req.body;

    // Vérification des champs requis
    if (!date_borrow || !date_return) {
      return res
        .status(400)
        .json({ message: "Les dates d'emprunt et de retour sont obligatoires." });
    }

    // Vérification si l'utilisateur et le livre existent
    const foundUser = await User.findById(userId);
    const foundBook = await Book.findById(bookId);

    if (!foundUser || !foundBook) {
      return res
        .status(404)
        .json({ message: "Utilisateur ou livre introuvable." });
    }

    // Création de l'emprunt
    const newBorrow = new Borrow({
      user: userId,
      book: bookId,
      date_borrow: new Date(date_borrow),
      date_return: new Date(date_return),
      status: "En cours",
      is_deleted: false,
      is_returned: false,
      is_valid: true,
    });

    // Sauvegarde dans la base de données
    await newBorrow.save();

    // Redirection vers la page des emprunts
    res.redirect("/books");
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'emprunt:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
exports.getBorrowById = async (req, res) => {
  try {
    const borrowId = req.params.id;
    const borrow = await Borrow.findById(borrowId).populate("user").populate("book");

    if (!borrow) {
      return res.status(404).json({ message: "Emprunt introuvable." });
    }

    res.render("pages/borrow-details", { borrow });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'emprunt:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
}
exports.updateBorrow = async (req, res) => {
  try {
    const borrowId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Le statut est obligatoire." });
    }

    const borrow = await Borrow.findById(borrowId);

    if (!borrow) {
      return res.status(404).json({ message: "Emprunt introuvable." });
    }

    borrow.status = status;

    await borrow.save();

    res.redirect(`/borrow-details/${borrowId}`);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'emprunt:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
}
exports.deleteBorrow = async (req, res) => {
  try {
    const borrowId = req.params.id;
    const borrow = await Borrow.findById(borrowId);

    if (!borrow) {
      return res.status(404).json({ message: "Emprunt introuvable." });
    }

    borrow.is_deleted = true;

    await borrow.save();

    res.json(borrow);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'emprunt:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
}

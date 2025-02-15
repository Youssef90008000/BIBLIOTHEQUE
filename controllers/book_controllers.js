// Description: This file contains the book controller functions.
// Import the Book model
const Book = require("../models/Book_models.js");
// Get all books
exports.allBooks = async (req, res) => {    
  try {
    const books = await Book.find(); // Récupère tous les livres depuis MongoDB
    res.status(200).render("pages/books" , {books}); // Renvoie les livres au format JSON
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

 // Get a book by id
exports.showBook = async (req, res) => {
    const bookId = req.params.id;
    try {
      const book = await Book.findById(bookId);
      res.render("pages/book-detail", {book});
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  // Add a new book
  exports.newBook = async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }// Delete a book by id
  exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id); // Suppression dans la base de données
        res.redirect('/books'); // Redirection après suppression
    } catch (error) {
        res.status(500).send("Erreur lors de la suppression.");
    }
};

 // Get a book by id
 exports.updateBookId = async (req, res) => {
    const bookId = req.params.id;
    try {
      const book = await Book.findById(bookId);
      res.render("pages/update", {book});
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

    // Update a book by id
  exports.updateBook = async (req, res) => {
    const bookId = req.params.id;
    console.log(req.body);
    try {
      const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
     new: true,
      });
      res.redirect("/books");
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

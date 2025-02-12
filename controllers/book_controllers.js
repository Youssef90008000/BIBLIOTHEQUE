// Description: This file contains the book controller functions.
// Import the Book model
const Book = require("../models/Book_models.js");
// Get all books
exports.allBooks = async (req, res) => {    
  try {
    const books = await Book.find(); // Récupère tous les livres depuis MongoDB
    res.status(200).render("pages/livres" , {books}); // Renvoie les livres au format JSON
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

 // Get a book by id
exports.showBook = async (req, res) => {
    const bookId = req.params.id;
    try {
      const book = await Book.findById(bookId);
      res.render("pages/details-livre", {book});
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
    const bookId = req.params.id;
    try {
      const deletedBook = await Book.findByIdAndDelete(bookId);
      res.status(200).json(deletedBook);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
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
      res.redirect("/livres");
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

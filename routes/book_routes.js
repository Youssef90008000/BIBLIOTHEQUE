const express = require("express");
const router = express.Router();
const auth = require("./../middlewares/auth");
const bookcontrollers = require("../controllers/book_controllers.js");

//routes
// routes for books
router.get("/books", auth, bookcontrollers.allBooks);
// get a book by id
router.get("/book-detail/:id", auth, bookcontrollers.showBook);

//routes foa add book

// GET route to add a book
router.get("/add-book", auth, (req, res) => {
  res.render("pages/add-book");
});
router.get("/add-book");
// POST route to add a book
router.post("/add-book", auth, bookcontrollers.newBook);

//delete book by id
router.delete("/books/:id", auth, bookcontrollers.deleteBook);

//update book by id
router.get("/update-book/:id", auth, bookcontrollers.updateBookId);

//update book by id
router.post("/update-book/:id", auth, bookcontrollers.updateBook);

//export router
module.exports = router;

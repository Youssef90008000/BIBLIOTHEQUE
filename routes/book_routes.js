const express = require("express");
const router = express.Router();
const bookcontrollers = require("../controllers/book_controllers.js");

//routes
// routes for books
router.get("/books", bookcontrollers.allBooks);
// get a book by id
router.get("/book-detail/:id", bookcontrollers.showBook);

//routes foa add book

// GET route to add a book
router.get('/add-book', (req, res) => {
    res.render('pages/add-book');
  });
router.get("/add-book");
// POST route to add a book
router.post("/add-book", bookcontrollers.newBook);

//delete book by id
router.delete("/books/:id", bookcontrollers.deleteBook);


//update book by id
router.get("/update/:id", bookcontrollers.updateBookId);

//update book by id
router.post("/update/:id", bookcontrollers.updateBook);

//export router
module.exports = router;

const express = require("express");
const router = express.Router();
const bookcontrollers = require("../controllers/book_controllers.js");

//routes

router.get("/livres", bookcontrollers.allBooks);
// get a book by id
router.get("/show-book/:id", bookcontrollers.showBook);

// POST route to add a book
router.post("/new-book", bookcontrollers.newBook);

//delete book by id
router.delete("/delete-book/:id", bookcontrollers.deleteBook);

//update book by id
router.put("/update-book/:id", bookcontrollers.updateBook);

//export router
module.exports = router;

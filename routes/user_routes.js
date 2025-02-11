const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user_controllers.js");
const Book = require("../models/user_models.js");
//routes
// Route pour la homepage
router.get('/', (req, res) => {
    res.render('pages/index');
  });
// Route pour le login
router.get('/login', userControllers.showLoginForm); // Affiche le formulaire

router.post('/login', userControllers.login); // Traite la connexion
// get all books
router.get("/all-user", userControllers.allUser);
// get a book by id
router.get("/show-user/:id", userControllers.showUser);

// POST route to add a book
router.post("/register", userControllers.register);

//delete book by id
router.delete("/delete-user/:id", userControllers.deleteUser);

//update book by id
router.put("/update-user/:id", userControllers.updateUser);

//login user
router.post("/login", userControllers.login);

//logout user
router.get("/logout", userControllers.logoutUser);


//export router

module.exports = router;
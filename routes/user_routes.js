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

// route pour le profil
router.get('/profil', (req, res) => {
  res.render('pages/profil');
});

//logout user
router.get("/logout", userControllers.logoutUser);

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




// // Route pour afficher la page d'accueil
// app.get('/', (req, res) => {  
//   res.render('main');
// });
// // Route pour afficher tous les livres
// app.get('/books', async (req, res) => {
//   try {
//     const books = await Book.find({});
//     res.render('books', { books });
//   } catch (err) {
//     console.error('Erreur lors de la récupération des livres:', err);
//     res.status(500).send('Erreur lors de la récupération des livres');
//   }
// });

// // Route pour afficher un livre spécifique
// app.get('/books/:id', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     res.render('book', { book });
//   } catch (err) {
//     console.error('Erreur lors de la récupération du livre:', err);
//     res.status(500).send('Erreur lors de la récupération du livre');
//   }
// });

// // Route pour afficher le formulaire de création d'un nouveau livre
// app.get('/books/new', (req, res) => {
//   try {
//     // Afficher la vue 'create' pour créer un nouveau livre
//     res.render('create');
//   } catch (error) {
//     // Gérer les erreurs de rendu
//     console.error('Erreur lors du rendu de la vue:', error);
//     res.status(500).send('Une erreur est survenue lors de la création du formulaire.');
//   }
// });


// // Route pour mettre à jour un livre
// app.get('/books/:id/edit', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) {
//       return res.status(404).send('Livre non trouvé');
//     }
//     res.render('update', { book });
//   } catch (err) {
//     res.status(500).send('Erreur lors de la récupération du livre');
//   }
// });

// // Route pour supprimer un livre
// app.delete('/books/:id', async (req, res) => {
//   try {
//     await Book.findByIdAndDelete(req.params.id);
//     res.sendStatus(204);
//   } catch (err) {
//     res.status(500).send('Erreur lors de la suppression du livre');
//   }
// });

//export router

module.exports = router;
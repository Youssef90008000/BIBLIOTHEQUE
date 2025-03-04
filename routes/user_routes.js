const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user_controllers.js");
const Book = require("../models/user_models.js");
const auth = require("./../middlewares/auth");
//routes
// Route pour la homepage
router.get("/", (req, res) => {
  res.render("pages/index");
});
// routes vers la page admin
router.get("/admin-index", userControllers.showAdmin);
//routes vers les profils
router.get("/profils-users", userControllers.allUser);
//routes vers la page details de l'utilistaeur
router.get("user-details", userControllers.showUser);
// Route vers l'inscription
router.get("/register", userControllers.showLoginRegister); // Affiche le formulaire

router.post("/register", userControllers.register); // Traite l' inscription

// Route pour le login
router.get("/login", userControllers.showLoginForm); // Affiche le formulaire

router.post("/login", userControllers.login); // Traite la connexion

//route pour le profil
router.get("/dashboard-studiant/:id", auth, userControllers.profil);

// Route GET pour afficher le formulaire de mise à jour
router.get("/profil-update/:id", userControllers.userDetailUpdate);

// Route POST pour mettre à jour l'utilisateur
router.post("/profil-update/:id", userControllers.updateUser);

// route pour le detail user
router.get("/user-details/:id", userControllers.showUser);

router.get("/forgot-password", userControllers.forgotPassword);

module.exports = router;

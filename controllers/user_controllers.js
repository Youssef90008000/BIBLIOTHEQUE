// Description: This file contains the functions that are used to interact with the user model.
const User = require("../models/user_models");
const Borrows = require("../models/borrow_models");
const bcrypt = require("bcrypt");

// Admin
exports.showAdmin = async (req, res) => {
  const userId = req.session.user.id;
  try {
    const user = req.session.user.role;
    if (user === "admin") {
      res.render("pages/admin-index");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.allUser = async (req, res) => {
  try {
    const users = await User.find(); // Récupère tous les utilisateurs depuis MongoDB
    res.status(200).render("pages/profils-users", { users }); // affiche les utilisateurs
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a user by id
exports.showUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.render("pages/user-details", { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.profil = async (req, res) => {
  const userId = req.params.id;
  try {
    // Récupérer l'utilisateur d'abord
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (user.role === "user") {
      const borrows = await Borrows.find({ user: userId })
        .populate("book")
        .populate("user");

      res.render("pages/dashboard-studiant", {
        borrows: borrows,
        user: user, // Utiliser l'utilisateur récupéré plutôt que borrows[0].user
      });
    } else {
      // Gérer les autres rôles ou rediriger
      res.status(403).json({ message: "Accès non autorisé" });
    }
  } catch (err) {
    console.error("Erreur lors de la récupération du profil:", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};


// // Delete a user by id
// exports.deleteUser = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const deletedUser = await User.findByIdAndDelete(userId);
//     res.status(200).json(deletedUser);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// }
exports.userDetailUpdate = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("Utilisateur non trouvé.");
    res.render("pages/profil-update", { user });
  } catch (err) {
    res.status(500).send("Erreur interne du serveur.");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {
      email,
      password,
      first,
      last,
      birthday_date,
      genre_preferences,
      favorite_books,
      reading_history,
      wishlist,
      bio,
      isPremiumMember,
      address,
      role,
    } = req.body;

    // Création de l'objet contenant les champs à mettre à jour
    const updateData = {
      email,
      first,
      last,
      birthday_date,
      bio,
      role,
      isPremiumMember: isPremiumMember === "on" ? true : false,
      genre_preferences: genre_preferences
        ? genre_preferences.split(",").map((pref) => pref.trim())
        : [],
      favorite_books: favorite_books
        ? favorite_books.split(",").map((book) => book.trim())
        : [],
      reading_history: reading_history
        ? reading_history.split(",").map((book) => book.trim())
        : [],
      wishlist: wishlist ? wishlist.split(",").map((book) => book.trim()) : [],
      address: address,
    };

    // Si un nouveau mot de passe est fourni, on le hache avant de l'enregistrer
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Mise à jour de l'utilisateur
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("Utilisateur non trouvé.");
    }

    // Redirection vers la page profil après la mise à jour
    const users = await User.find(); // Récupère tous les utilisateurs depuis MongoDB
    res.status(200).render("pages/profils-users", { users }); // affiche les utilisateurs
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la mise à jour de l'utilisateur.");
  }
};

// Afficher la page d'inscription
exports.showLoginRegister = (req, res) => {
  res.render("pages/register");
};
exports.register = async (req, res) => {
  // s'inscrire un nouvel utilisateur
  try {
    const { email, password } = req.body;

    let userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: email + " cet email existe deja" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    let savedUser = await user.save();

    return res
      .status(201)
      .json({ message: savedUser.first + " vient d'etere creeé" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// Afficher la page de connexion
exports.showLoginForm = (req, res) => {
  res.render("pages/login");
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body; // Récupération du rôle
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier si le rôle sélectionné correspond au rôle de l'utilisateur
    if (user.role !== role) {
      return res.status(403).json({ message: "Accès refusé : rôle incorrect" });
    }

    // Stocker uniquement l'ID et le rôle dans la session
    req.session.user = {
      id: user._id,
      last: user.last,
      first: user.first,
      email: user.email,
      role: user.role,
    };
    // Stocker les infos dans res.locals pour EJS
    res.locals.user = req.session.user;
    // Redirection selon le rôle
    if (user.role === "admin") {
      return res.redirect("/admin-index");
    } else {
      return res.redirect("/dashboard-studiant/" + user._id);
    }
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    return res.status(500).json({
      message: "Une erreur est survenue, veuillez réessayer plus tard.",
    });
  }
};

exports.forgotPassword = (req, res, next) => {
  try {
    res.render("pages/forgot-password");
  } catch (e) {
    console.error(e);
    res.status(403).json({ error: e });
  }
};

//Logout a user

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
      if(err) {
          console.error("Erreur lors de la déconnexion:", err);
          return res.status(500).json({ message: "Erreur lors de la déconnexion" });
      }
      res.clearCookie('connect.sid');
      res.redirect('/?message=Vous avez été déconnecté avec succès');
  });
};


// Description: Ce fichier contient les fonctions qui sont utilisées pour interagir avec le modèle d'utilisateur.

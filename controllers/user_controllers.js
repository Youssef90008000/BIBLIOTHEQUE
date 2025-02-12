// Description: This file contains the functions that are used to interact with the user model.
const User = require("../models/user_models");
const bcrypt = require("bcrypt");


// Get all users
exports.allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get a user by id
exports.showUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
    } catch (err) {
    res.status(404).json({ message: err.message });
    }
};


// Delete a user by id
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// Update a user by id
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }); 
    res.status(200).json(updatedUser);
    }
    catch (err) {   
      res.status(404).json({ message: err.message });
    }   
}

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
      password: hashedPassword
    });

    let savedUser = await user.save();

    return res.status(201).json({ message: savedUser.first + " vient d'etere creeé" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// Afficher la page de connexion
exports.showLoginForm = (req, res) => {
  res.render('pages/login');
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    // Stocker uniquement l'ID de l'utilisateur en session
    req.session.user = user
    
    // Redirection vers la page de profil
    res.redirect('/profil');
    
  } catch (err) {
    console.log(err)
    console.error("Erreur lors de la connexion :", err);
    return res.status(500).json({ message: 'Une erreur est survenue, veuillez réessayer plus tard.' });
  }
};



// Logout a user

exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User logged out" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// hash password

hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

verifyPassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}



// Description: Ce fichier contient les fonctions qui sont utilisées pour interagir avec le modèle d'utilisateur.
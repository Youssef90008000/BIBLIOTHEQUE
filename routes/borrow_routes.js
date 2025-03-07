const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrow_controllers'); // Assurez-vous que le chemin est correct

// Récupérer tous les emprunts
router.get('/borrows', borrowController.getAllBorrows);

// Page pour ajouter un emprunt
router.get('/borrows-create', borrowController.addBorrowPage);

// Ajouter un emprunt
router.post('/borrows-create', borrowController.addBorrow);
// Ajouter un emprunt
router.post('/book-detail/:id', borrowController.addBorrowUser);

module.exports = router;

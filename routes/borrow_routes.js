const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrow_controllers'); // Assurez-vous que le chemin est correct

// Récupérer tous les emprunts
router.get('/borrows', borrowController.getAllBorrows);

// Page pour ajouter un emprunt
router.get('/borrows-create', borrowController.addBorrowPage);

// Ajouter un emprunt
router.post('/borrows-create', borrowController.addBorrow);
// Récupérer un emprunt par son id
router.get('/borrow-details/:id', borrowController.getBorrowById);
// Mettre à jour un emprunt par son id
router.post('/borrow-details/:id', borrowController.updateBorrow);
// Supprimer un emprunt par son id
router.delete('/borrows/:id', borrowController.deleteBorrow);
// Ajouter un emprunt
router.post('/book-detail/:id', borrowController.addBorrowUser);

module.exports = router;

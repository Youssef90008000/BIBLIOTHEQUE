const express = require('express');
const router = express.Router();
const auth = require("./../middlewares/auth");
const borrowController = require('../controllers/borrow_controllers'); // Assurez-vous que le chemin est correct

// Récupérer tous les emprunts
router.get('/borrows',auth, borrowController.getAllBorrows);

// Page pour ajouter un emprunt
router.get('/borrows-create',auth, borrowController.addBorrow);

// Page pour ajouter un emprunt
router.get('/borrows-create',auth, borrowController.addBorrowPage);

// Ajouter un emprunt
router.post('/borrows-create',auth, borrowController.addBorrow);
// Récupérer un emprunt par son id
router.get('/borrow-details/:id',auth, borrowController.getBorrowById);
// Mettre à jour un emprunt par son id
router.post('/borrow-details/:id',auth, borrowController.updateBorrow);
// Supprimer un emprunt par son id
router.delete('/borrows/:id',auth, borrowController.deleteBorrow);
// Ajouter un emprunt
router.post('/book-detail/:id',auth, borrowController.addBorrowUser);

module.exports = router;

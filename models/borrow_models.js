const mongoose = require('mongoose');

const BorrowSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  date_borrow: { type: Date, required: true },
  date_return: { type: Date, required: true },
  status: { type: String, required: true, default: "En cours" },  // Ajout d'un statut par défaut
  is_deleted: { type: Boolean, default: false },
  is_returned: { type: Boolean, default: false },
  is_valid: { type: Boolean, default: true }
});

const Borrow = mongoose.model('Borrow', BorrowSchema);
module.exports = Borrow;


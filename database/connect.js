const mongoose = require("mongoose");
require("dotenv").config(); // Charge les variables d'environnement

async function connectDb() {
  try {
    if (!process.env.MONGO_URI || !process.env.DB_NAME) {
      throw new Error("❌ Les variables d'environnement MONGO_URI ou DB_NAME sont manquantes.");
    }

    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME, // Nom de la base de données
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout après 10 secondes
    });

    console.log("✅ Connexion réussie à la base de données");
  } catch (err) {
    console.error("❌ Erreur de connexion à MongoDB :", err);
    process.exit(1); // Arrêter l'exécution en cas d'échec
  }
}

module.exports = connectDb;

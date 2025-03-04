// Importation des modules
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require('cors');
const methodOverride = require("method-override");
require("dotenv").config();
const path = require("path");

// Connexion à la base de données
const connectDb = require("./database/connect.js");

// Importation des routes
const bookRouter = require("./routes/book_routes.js");
const userRouter = require("./routes/user_routes.js");
const borrowRouter = require("./routes/borrow_routes.js");
const bookRoutes = require('./routes/book_routes');
const userRoutes = require('./routes/user_routes');
const borrowRoutes = require('./routes/borrow_routes');

// Création de l'application Express
const app = express();
const upload = multer();
const port = process.env.PORT || 3005;

// 🛠 Middleware

app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Permet les requêtes cross-origin
app.use(express.json());
app.use(upload.none());

// Gestion des sessions

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 jours
  })
);

// Middleware global pour stocker l'utilisateur en session
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


// Autoriser les requêtes PUT et DELETE via methodOverride
app.use(methodOverride("_method"));

// Définition des routes
app.use(bookRouter);
app.use(userRouter);
app.use(borrowRouter);
app.use('/bibliotheque', borrowRoutes);
app.use('/bibliotheque', bookRoutes);
app.use('/bibliotheque', userRoutes);

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Configuration du moteur de rendu EJS
app.set("view engine", "ejs");

// Connexion à la base de données
connectDb();

// Démarrer le serveur
app.listen(port, () => {
  console.log(`✅ Serveur démarré sur le port : ${port}`);
});

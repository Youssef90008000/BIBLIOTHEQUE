// Description: Ce fichier contient le code pour créer un serveur Express qui se connecte à une base de données MongoDB et effectue des opérations CRUD sur une collection de livres.
//require express, body-parser, dotenv
const express = require("express");
const multer = require("multer");
require("dotenv").config();
const path = require('path');


//require database connection
const connectDb = require("./database/connect.js");

//require routes
const bookRouter = require("./routes/book_routes.js");
const userRouter = require("./routes/user_routes.js");
const bodyParser = require("body-parser");


// Créer une application Express
const app = express();
const upload = multer();
const port = process.env.PORT || 3005;

// controlleurs

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.none());
app.use(bookRouter);
app.use(userRouter);
app.use(express.static("public"));



app.set('view engine', 'ejs'); // Utiliser EJS comme moteur de rendu

//database connection
connectDb();

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port:` + port);
});

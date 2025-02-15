const express = require("express");
const mongoose = require("mongoose");

// Modèle de user
const userSchema = mongoose.Schema({
        email: { type: String },
        password: { type: String },
        first: { type: String },
        last: { type: String },
        avatar: { type: String },
        age: { type: Number },
        genre_preferences: { type: Array },
        favorite_books: { type: Array },
        reading_history: { type: Array },
        wishlist: { type: Array },
        bio:{ type: String },
        isPremiumMember: { type: Boolean },
        address: {type:Object},
        role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
              }
});

//definir un model
const User = mongoose.model("User", userSchema);

module.exports = User;
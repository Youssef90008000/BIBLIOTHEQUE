const express = require("express");
const mongoose = require("mongoose");

// Modèle de user
const userSchema = mongoose.Schema({
        email: { type: String },
        password: { type: String },
        first: { type: String },
        last: { type: String },
        avatar: { type: String },
        birthday_date: {
                type: Date,
                set: function(value) {
                let date = new Date(value);
                // Crée une nouvelle date au début de la journée (minuit)
                return new Date(date.getFullYear(), date.getMonth(), date.getDate());
                }
                },
        genre_preferences: { type: Array },
        favorite_books: { type: Array },
        reading_history: { type: Array },
        wishlist: { type: Array },
        bio:{ type: String },
        isPremiumMember: { type: Boolean },
        address: {type:String},
        role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
              },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deletedAt: { type: Date, default: null },
        deleted: { type: Boolean, default: false },
        active: { type: Boolean, default: false },
});

//definir un model
const User = mongoose.model("User", userSchema);

module.exports = User;
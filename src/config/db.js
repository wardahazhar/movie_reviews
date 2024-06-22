const mongoose = require('mongoose');
const express = require('express')
const movieReview = require('./models/movieReviewModel')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

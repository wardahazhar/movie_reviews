
const mongoose = require('mongoose');

const movieReviewSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  reviewer: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  reviewText: { type: String, required: true }
}, {
  timestamps: true
});

const MovieReview = mongoose.model('user-review', movieReviewSchema);

module.exports = MovieReview;

const MovieReview = require('../models/movieReviewModel');

class MovieService {
  async createReview(data) {
    const review = new MovieReview(data);
    return await review.save();
  }

  async getAllReviews() {
    return await MovieReview.find();
  }

  async getReviewById(id) {
    return await MovieReview.findById(id);
  }

  async updateReview(id, data) {
    return await MovieReview.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteReview(id) {
    return await MovieReview.findByIdAndDelete(id);
  }
}

module.exports = new MovieService();

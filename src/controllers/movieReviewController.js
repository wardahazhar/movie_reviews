const movieReviewService = require('../services/movieReviewService');

class MovieController {
  async createReview(req, res) {
    try {
      const review = await movieReviewService.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllReviews(req, res) {
    try {
      const reviews = await movieReviewService.getAllReviews();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getReviewById(req, res) {
    try {
      const review = await movieReviewService.getReviewById(req.params.id);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateReview(req, res) {
    try {
      const review = await movieReviewService.updateReview(req.params.id, req.body);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteReview(req, res) {
    try {
      const review = await movieReviewService.deleteReview(req.params.id);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MovieController();

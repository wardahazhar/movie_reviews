const request = require('supertest');
const express = require('express');
const movieReviewService = require('../src/services/movieReviewService');
const MovieController = require('../src/controllers/movieReviewController');

jest.mock('../src/services/movieReviewService'); // Mock the movieReviewService

const app = express();
app.use(express.json());
app.post('/reviews', MovieController.createReview);
app.get('/reviews', MovieController.getAllReviews);
app.get('/reviews/:id', MovieController.getReviewById);
app.put('/reviews/:id', MovieController.updateReview);
app.delete('/reviews/:id', MovieController.deleteReview);

describe('MovieController', () => {
  describe('createReview', () => {
    it('should create and return a new review', async () => {
      const review = { _id: '123', title: 'Inception', review: 'Great movie!' };
      movieReviewService.createReview.mockResolvedValue(review);

      const response = await request(app).post('/reviews').send(review);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(review);
      expect(movieReviewService.createReview).toHaveBeenCalledWith(review);
    });

    it('should return 500 if service throws an error', async () => {
      const review = { title: 'Inception', review: 'Great movie!' };
      movieReviewService.createReview.mockRejectedValue(new Error('Save failed'));

      const response = await request(app).post('/reviews').send(review);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Save failed' });
    });
  });

  describe('getAllReviews', () => {
    it('should return all reviews', async () => {
      const reviews = [{ _id: '123', title: 'Inception', review: 'Great movie!' }];
      movieReviewService.getAllReviews.mockResolvedValue(reviews);

      const response = await request(app).get('/reviews');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(reviews);
      expect(movieReviewService.getAllReviews).toHaveBeenCalled();
    });

    it('should return 500 if service throws an error', async () => {
      movieReviewService.getAllReviews.mockRejectedValue(new Error('Find failed'));

      const response = await request(app).get('/reviews');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Find failed' });
    });
  });

  describe('getReviewById', () => {
    it('should return a review by ID', async () => {
      const review = { _id: '123', title: 'Inception', review: 'Great movie!' };
      movieReviewService.getReviewById.mockResolvedValue(review);

      const response = await request(app).get('/reviews/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(review);
      expect(movieReviewService.getReviewById).toHaveBeenCalledWith('123');
    });

    it('should return 404 if review not found', async () => {
      movieReviewService.getReviewById.mockResolvedValue(null);

      const response = await request(app).get('/reviews/123');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Review not found' });
    });

    it('should return 500 if service throws an error', async () => {
      movieReviewService.getReviewById.mockRejectedValue(new Error('FindById failed'));

      const response = await request(app).get('/reviews/123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'FindById failed' });
    });
  });

  describe('updateReview', () => {
    it('should update and return the review', async () => {
      const review = { _id: '123', title: 'Inception', review: 'Amazing movie!' };
      movieReviewService.updateReview.mockResolvedValue(review);

      const response = await request(app).put('/reviews/123').send({ review: 'Amazing movie!' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(review);
      expect(movieReviewService.updateReview).toHaveBeenCalledWith('123', { review: 'Amazing movie!' });
    });

    it('should return 404 if review not found for update', async () => {
      movieReviewService.updateReview.mockResolvedValue(null);

      const response = await request(app).put('/reviews/123').send({ review: 'Amazing movie!' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Review not found' });
    });

    it('should return 500 if service throws an error', async () => {
      movieReviewService.updateReview.mockRejectedValue(new Error('FindByIdAndUpdate failed'));

      const response = await request(app).put('/reviews/123').send({ review: 'Amazing movie!' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'FindByIdAndUpdate failed' });
    });
  });

  describe('deleteReview', () => {
    it('should delete the review', async () => {
      movieReviewService.deleteReview.mockResolvedValue({ _id: '123', title: 'Inception', review: 'Great movie!' });

      const response = await request(app).delete('/reviews/123');

      expect(response.status).toBe(204);
      expect(movieReviewService.deleteReview).toHaveBeenCalledWith('123');
    });

    it('should return 404 if review not found for delete', async () => {
      movieReviewService.deleteReview.mockResolvedValue(null);

      const response = await request(app).delete('/reviews/123');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Review not found' });
    });

    it('should return 500 if service throws an error', async () => {
      movieReviewService.deleteReview.mockRejectedValue(new Error('FindByIdAndDelete failed'));

      const response = await request(app).delete('/reviews/123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'FindByIdAndDelete failed' });
    });
  });
});

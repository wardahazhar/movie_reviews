const MovieReview = require('../src/models/movieReviewModel');
const MovieService = require('../src/services/movieReviewService');

jest.mock('../src/models/movieReviewModel'); // Mock the MovieReview model

describe('MovieService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createReview', () => {
    it('should create and save a new review', async () => {
      const data = { title: 'Inception', review: 'Great movie!' };
      const savedReview = { _id: '123', ...data };

      MovieReview.prototype.save = jest.fn().mockResolvedValue(savedReview);

      const result = await MovieService.createReview(data);

      expect(result).toEqual(savedReview);
      expect(MovieReview.prototype.save).toHaveBeenCalled();
    });

    it('should throw an error if save fails', async () => {
      const data = { title: 'Inception', review: 'Great movie!' };
      const errorMessage = 'Save failed';

      MovieReview.prototype.save = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(MovieService.createReview(data)).rejects.toThrow(errorMessage);
      expect(MovieReview.prototype.save).toHaveBeenCalled();
    });
  });

  describe('getAllReviews', () => {
    it('should return all reviews', async () => {
      const reviews = [{ _id: '123', title: 'Inception', review: 'Great movie!' }];

      MovieReview.find = jest.fn().mockResolvedValue(reviews);

      const result = await MovieService.getAllReviews();

      expect(result).toEqual(reviews);
      expect(MovieReview.find).toHaveBeenCalled();
    });

    it('should throw an error if find fails', async () => {
      const errorMessage = 'Find failed';

      MovieReview.find = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(MovieService.getAllReviews()).rejects.toThrow(errorMessage);
      expect(MovieReview.find).toHaveBeenCalled();
    });
  });

  describe('getReviewById', () => {
    it('should return a review by ID', async () => {
      const review = { _id: '123', title: 'Inception', review: 'Great movie!' };

      MovieReview.findById = jest.fn().mockResolvedValue(review);

      const result = await MovieService.getReviewById('123');

      expect(result).toEqual(review);
      expect(MovieReview.findById).toHaveBeenCalledWith('123');
    });

    it('should return null if review not found', async () => {
      MovieReview.findById = jest.fn().mockResolvedValue(null);

      const result = await MovieService.getReviewById('123');

      expect(result).toBeNull();
      expect(MovieReview.findById).toHaveBeenCalledWith('123');
    });

    it('should throw an error if findById fails', async () => {
      const errorMessage = 'FindById failed';

      MovieReview.findById = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(MovieService.getReviewById('123')).rejects.toThrow(errorMessage);
      expect(MovieReview.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('updateReview', () => {
    it('should update and return the review', async () => {
      const data = { review: 'Amazing movie!' };
      const updatedReview = { _id: '123', title: 'Inception', review: 'Amazing movie!' };

      MovieReview.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedReview);

      const result = await MovieService.updateReview('123', data);

      expect(result).toEqual(updatedReview);
      expect(MovieReview.findByIdAndUpdate).toHaveBeenCalledWith('123', data, { new: true });
    });

    it('should return null if review not found for update', async () => {
      const data = { review: 'Amazing movie!' };

      MovieReview.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const result = await MovieService.updateReview('123', data);

      expect(result).toBeNull();
      expect(MovieReview.findByIdAndUpdate).toHaveBeenCalledWith('123', data, { new: true });
    });

    it('should throw an error if findByIdAndUpdate fails', async () => {
      const data = { review: 'Amazing movie!' };
      const errorMessage = 'FindByIdAndUpdate failed';

      MovieReview.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(MovieService.updateReview('123', data)).rejects.toThrow(errorMessage);
      expect(MovieReview.findByIdAndUpdate).toHaveBeenCalledWith('123', data, { new: true });
    });
  });

  describe('deleteReview', () => {
    it('should delete the review', async () => {
      const deletedReview = { _id: '123', title: 'Inception', review: 'Great movie!' };

      MovieReview.findByIdAndDelete = jest.fn().mockResolvedValue(deletedReview);

      const result = await MovieService.deleteReview('123');

      expect(result).toEqual(deletedReview);
      expect(MovieReview.findByIdAndDelete).toHaveBeenCalledWith('123');
    });

    it('should return null if review not found for delete', async () => {
      MovieReview.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      const result = await MovieService.deleteReview('123');

      expect(result).toBeNull();
      expect(MovieReview.findByIdAndDelete).toHaveBeenCalledWith('123');
    });

    it('should throw an error if findByIdAndDelete fails', async () => {
      const errorMessage = 'FindByIdAndDelete failed';

      MovieReview.findByIdAndDelete = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(MovieService.deleteReview('123')).rejects.toThrow(errorMessage);
      expect(MovieReview.findByIdAndDelete).toHaveBeenCalledWith('123');
    });
  });
});

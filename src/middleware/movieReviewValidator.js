const { body, param } = require('express-validator');

const validateReview = [
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
  body('content').notEmpty().withMessage('Content is required').isString().withMessage('Content must be a string'),
  body('rating').notEmpty().withMessage('Rating is required').isNumeric().withMessage('Rating must be a number'),
];

const validateReviewId = [
  param('id').isMongoId().withMessage('Invalid review ID'),
];

module.exports = {
  validateReview,
  validateReviewId,
};

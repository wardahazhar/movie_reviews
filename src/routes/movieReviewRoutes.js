// src/routes/movieReviewRoutes.js

const express = require('express');
const movieController = require('../controllers/movieReviewController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MovieReview:
 *       type: object
 *       required:
 *         - movieTitle
 *         - reviewer
 *         - rating
 *         - reviewText
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the movie review
 *         movieTitle:
 *           type: string
 *           description: The title of the movie
 *         reviewer:
 *           type: string
 *           description: The name of the reviewer
 *         rating:
 *           type: number
 *           description: The rating given to the movie
 *         reviewText:
 *           type: string
 *           description: The text of the review
 *       example:
 *         movieTitle: Inception
 *         reviewer: John Doe
 *         rating: 9
 *         reviewText: Great movie with mind-bending plot twists!
 */

/**
 * @swagger
 * tags:
 *   name: MovieReviews
 *   description: The movie reviews managing API
 */

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie review
 *     tags: [MovieReviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieReview'
 *     responses:
 *       201:
 *         description: The movie review was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovieReview'
 *       500:
 *         description: Some server error
 */
router.post('/', movieController.createReview);

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Returns the list of all the movie reviews
 *     tags: [MovieReviews]
 *     responses:
 *       200:
 *         description: The list of the movie reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MovieReview'
 */
router.get('/', movieController.getAllReviews);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie review by ID
 *     tags: [MovieReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie review id
 *     responses:
 *       200:
 *         description: The movie review description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovieReview'
 *       404:
 *         description: The movie review was not found
 */
router.get('/:id', movieController.getReviewById);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie review by the id
 *     tags: [MovieReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie review id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieReview'
 *     responses:
 *       200:
 *         description: The movie review was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovieReview'
 *       404:
 *         description: The movie review was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', movieController.updateReview);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Remove the movie review by id
 *     tags: [MovieReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie review id
 *     responses:
 *       200:
 *         description: The movie review was deleted
 *       404:
 *         description: The movie review was not found
 */
router.delete('/:id', movieController.deleteReview);

module.exports = router;

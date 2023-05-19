const express = require('express');
const router = express.Router();
const {
  getAllReviewsByProductId,
  editReview,
  createReview,
  deleteReviewById,
} = require('../controllers/reviews.js');
const authenticateToken = require('../helpers/authToken.js');

router.get('/products/:productId/reviews', getAllReviewsByProductId);
router.post('/products/:productId/reviews', authenticateToken, createReview);
router.patch(
  '/products/:productId/reviews/:reviewId',
  authenticateToken,
  editReview
);
router.delete(
  '/products/:productId/reviews/:reviewId',
  authenticateToken,
  deleteReviewById
);

module.exports = router;

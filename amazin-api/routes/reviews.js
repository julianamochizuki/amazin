const express = require('express');
const router = express.Router();
const {
  getAllReviewsByProductId,
  getAllReviewsByUserId,
  createReview,
  updateReviewById,
  deleteReviewById,
} = require('../controllers/reviews.js');

router.get('/products/:productId/reviews', getAllReviewsByProductId);
router.get('/users/:userId/reviews', getAllReviewsByUserId);
router.post('/products/:productId/reviews', createReview);
// router.patch("/products/:productId/reviews/:reviewId", updateReviewById);
router.delete('/products/:productId/reviews/:reviewId', deleteReviewById);

module.exports = router;

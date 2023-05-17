const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllReviewsByProductId = async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId: Number(req.params.productId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  if (!reviews) {
    res.status(404).json("Reviews not found");
  } else {
    res.json(reviews);
  }
};

const createReview = async (req, res) => {
  const review = await prisma.review.create({
    data: {
      ...req.body,
    },
  });
  res.json(review);
};

// const updateReviewById = async (req, res) => {
//   const review = await prisma.review.update({
//     where: {
//       id: Number(req.params.reviewId),
//     },
//     data: {
//       ...req.body,
//     },
//   });
//   if (!review) {
//     res.status(404).json("Review not found");
//   } else {
//     res.json(review);
//   }
// };

const deleteReviewById = async (req, res) => {
  const review = await prisma.review.delete({
    where: {
      id: Number(req.params.reviewId),
    },
  });
  if (!review) {
    res.status(404).json("Review not found");
  } else {
    res.json(review);
  }
};

module.exports = {
  getAllReviewsByProductId,
  createReview,
  // updateReviewById,
  deleteReviewById,
};

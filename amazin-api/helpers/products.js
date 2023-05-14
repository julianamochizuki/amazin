export default function getRating(reviews) {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);

  return totalRating / reviews.length;
}

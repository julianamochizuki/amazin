type ReviewsType = {
  reviews: any[];
};

type RatingStatsType = {
  [key: string]: number;
};

export default function getRating(reviews: ReviewsType['reviews']) {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);

  return totalRating / reviews.length;
}

export function getRatingStats(reviews: ReviewsType['reviews']) {
  const ratingStats: RatingStatsType = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    const rating = review.rating as 5 | 4 | 3 | 2 | 1;
    ratingStats[rating] += 1;
  });

  ratingStats[5] = Math.round((ratingStats[5] / reviews.length) * 100);
  ratingStats[4] = Math.round((ratingStats[4] / reviews.length) * 100);
  ratingStats[3] = Math.round((ratingStats[3] / reviews.length) * 100);
  ratingStats[2] = Math.round((ratingStats[2] / reviews.length) * 100);
  ratingStats[1] = Math.round((ratingStats[1] / reviews.length) * 100);

  return ratingStats;
}

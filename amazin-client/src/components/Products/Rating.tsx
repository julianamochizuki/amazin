import React from 'react';
import { Card } from 'react-bootstrap';
import { ChevronDown, Star, StarFill, StarHalf } from 'react-bootstrap-icons';

type Props = {
  reviews: {
    id: number;
    description: string;
    rating: number;
    productId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
  }[];
};

const MAX_RATING = 5;

export default function StarRating({ reviews }: Props) {
  const getRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);

    return totalRating / reviews.length;
  };

  const rating = getRating();

  const solidStars = Array.from({ length: rating }, (_, index) => <StarFill />);

  const halfStar = rating % 1 !== 0 ? <StarHalf /> : null;

  const regularStars = Array.from(
    { length: MAX_RATING - rating },
    (_, index) => <Star />
  );

  return (
    <Card.Text style={{ color: '#FFA41C' }}>
      {solidStars}
      {halfStar}
      {regularStars}
      <span>
        <ChevronDown
          style={{ marginLeft: '2px', color: '#017185', fontSize: '14px' }}
        />
      </span>
      <span style={{ marginLeft: '10px', color: '#017185', fontSize: '14px' }}>
        {reviews.length}
      </span>
    </Card.Text>
  );
}

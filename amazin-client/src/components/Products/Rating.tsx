import React from 'react';
import { Card } from 'react-bootstrap';
import { ChevronDown, Star, StarFill, StarHalf } from 'react-bootstrap-icons';
import { ReviewType } from '../../types/types';

type Props = {
  reviews: ReviewType[];
};

const MAX_RATING = 5;

export default function StarRating({ reviews }: Props) {

  const getRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => {
      return acc + review!.rating;
    }, 0);

    return totalRating / reviews.length;
  };

  const rating = getRating();

  const solidStars = Array.from({ length: rating }, (_, index) => (
    <StarFill key={`solid-star-${index}`} />
  ));

  const halfStar = rating % 1 !== 0 ? <StarHalf key={`half-star`} /> : null;

  const regularStars = Array.from(
    { length: MAX_RATING - rating },
    (_, index) => <Star key={`regular-star-${index}`} />
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

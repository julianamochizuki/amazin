import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import { ReviewType } from '../../types/types';

type Props = {
  review: ReviewType;
};

export default function ReviewListItem(props: Props) {
  const { review } = props;
  const MAX_RATING = 5;
  const rating = review.rating;

  const solidStars = Array.from({ length: rating }, (_, index) => (
    <StarFill key={`solid-star-${index}`} />
  ));

  const regularStars = Array.from(
    { length: MAX_RATING - rating },
    (_, index) => <Star key={`regular-star-${index}`} />
  );

  return (
    <Col>
      <Row>{review.user.name}</Row>
      <Col style={{ color: '#FFA41C' }}>
        {solidStars}
        {regularStars}
      </Col>
      <Row>Reviewed on {review.createdAt}</Row>
      <Row>{review.description}</Row>
    </Col>
  );
}

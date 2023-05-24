import React from 'react';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ProductType } from '../../types/types';
import StarRating from '../Products/Rating';

type Props = {
  averageRating: number;
  ratingStats: any;
};

export default function ReviewStats(props: Props) {
  const { ratingStats, averageRating } = props;
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );

  return (
    <Col className="review-stats">
      <Row>Customer Reviews</Row>
      <Row>
        <StarRating key={currentProduct.id} reviews={currentProduct.reviews} />
      </Row>
      <Row>{averageRating.toFixed(1)} out of 5</Row>
      {currentProduct.reviews.length > 1 ? (
        <Row>{currentProduct.reviews.length} global ratings</Row>
      ) : (
        <Row>{currentProduct.reviews.length} global rating</Row>
      )}
      <Col>
        {Object.keys(ratingStats).map((key) => {
          const rating = parseInt(key);
          const percentage = ratingStats[rating];
          return (
            <Row key={rating}>
              <Col>
                {rating} {rating === 1 ? 'star' : 'stars'}
              </Col>
              <Col>
                <ProgressBar
                  now={percentage}
                  variant="warning"
                  className="progress-bar-review"
                />
              </Col>
              <Col>{percentage}%</Col>
            </Row>
          );
        })}
      </Col>
    </Col>
  );
}

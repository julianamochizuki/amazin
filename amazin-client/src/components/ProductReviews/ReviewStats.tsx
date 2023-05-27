import React from 'react';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
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
      <h4>Customer Reviews</h4>
      <Row>
        <StarRating key={currentProduct.id} reviews={currentProduct.reviews} />
      </Row>
      <Row>
        <p>{averageRating.toFixed(1)} out of 5</p>
      </Row>
      {currentProduct.reviews.length > 1 ? (
        <Row>
          <p>{currentProduct.reviews.length} global ratings</p>
        </Row>
      ) : (
        <Row>
          <p>{currentProduct.reviews.length} global rating</p>
        </Row>
      )}
      <Col>
        {Object.keys(ratingStats).map((key) => {
          const rating = parseInt(key);
          const percentage = ratingStats[rating];
          return (
            <Row key={rating}>
              <Col xs={2}>
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

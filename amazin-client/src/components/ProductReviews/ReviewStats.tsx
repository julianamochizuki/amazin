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
    <Col xs={12} md={5} className="review-stats mb-3">
      <h5>Customer Reviews</h5>
      <Row>
        <StarRating key={currentProduct.id} reviews={currentProduct.reviews} />
      </Row>
      <Row>
        <p className="product-text">{averageRating.toFixed(1)} out of 5</p>
      </Row>
      {currentProduct.reviews.length > 1 ? (
        <Row className="product-text">
          <p>{currentProduct.reviews.length} global ratings</p>
        </Row>
      ) : (
        <Row className="product-text">
          <p>{currentProduct.reviews.length} global rating</p>
        </Row>
      )}
      <Col className="product-text">
        {Object.keys(ratingStats).map((key) => {
          const rating = parseInt(key);
          const percentage = ratingStats[rating];
          return (
            <Row key={rating}>
              <Col>
                {rating} {rating === 1 ? 'star' : 'stars'}
              </Col>
              <Col xs={6}>
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

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import getRating, { getRatingStats } from '../../helpers/products';
import { ProductType } from '../../types/types';
import StarRating from '../Products/Rating';
import ReviewList from './ReviewList';

type Props = {
  currentProduct: ProductType;
};

export default function ProductReviews(props: Props) {
  const { currentProduct } = props;

  const averageRating = getRating(currentProduct.reviews);
  const ratingStats = getRatingStats(currentProduct.reviews);

  return (
    <Row className="product-reviews-container">
      <Col>
        <Row>Customer Reviews</Row>
        <Row>
          <StarRating
            key={currentProduct.id}
            reviews={currentProduct.reviews}
          />
          <span>{averageRating.toFixed(1)} out of 5</span>
        </Row>
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
                {rating} {rating === 1 ? 'star' : 'stars'}: {percentage}%
              </Row>
            );
          })}
        </Col>
      </Col>
      <Col>
        <Row>Top reviews from Canada</Row>
        <Col>
          <ReviewList key={currentProduct.id} currentProduct={currentProduct} />
        </Col>
      </Col>
    </Row>
  );
}

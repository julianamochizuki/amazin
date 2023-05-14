import React from 'react';
import { Row } from 'react-bootstrap';
import getRating, { getRatingStats } from '../../helpers/products';
import { ProductType } from '../../types/types';
import ReviewList from './ReviewList';
import ReviewStats from './ReviewStats';

type Props = {
  currentProduct: ProductType;
};

export default function ProductReviews(props: Props) {
  const { currentProduct } = props;

  const averageRating = getRating(currentProduct.reviews);
  const ratingStats = getRatingStats(currentProduct.reviews);

  return (
    <Row className="product-reviews-container">
      <ReviewStats
        currentProduct={currentProduct}
        ratingStats={ratingStats}
        averageRating={averageRating}
      />
      <ReviewList key={currentProduct.id} currentProduct={currentProduct} />
      <ReviewStats
        currentProduct={currentProduct}
        ratingStats={ratingStats}
        averageRating={averageRating}
      />
      <ReviewList key={currentProduct.id} currentProduct={currentProduct} />
    </Row>
  );
}

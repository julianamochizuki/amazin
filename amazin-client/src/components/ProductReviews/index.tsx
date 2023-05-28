import React from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import getRating, { getRatingStats } from '../../helpers/products';
import ReviewList from './ReviewList';
import ReviewStats from './ReviewStats';

type Props = {
  setReviewsEdited: any;
};

export default function ProductReviews(props: Props) {
  const { setReviewsEdited } = props;
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );

  const averageRating = getRating(currentProduct.reviews);
  const ratingStats = getRatingStats(currentProduct.reviews);

  return (
    <Row className="product-reviews-container my-2 mx-1 pt-3">
      <ReviewStats
        ratingStats={ratingStats}
        averageRating={averageRating}
      />
      <ReviewList
        key={currentProduct.id}
        setReviewsEdited={setReviewsEdited}
      />
    </Row>
  );
}

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductType } from '../../types/types';
import ReviewListItem from './ReviewListItem';

type Props = {
  currentProduct: ProductType;
  setReviewsEdited: any;
};

export default function ReviewList(props: Props) {
  const { currentProduct, setReviewsEdited } = props;
  const { reviews } = currentProduct;

  const categoryLists = reviews.map((r) => {
    return (
      <ReviewListItem
        key={r.id}
        review={r}
        currentProduct={currentProduct}
        setReviewsEdited={setReviewsEdited}
        // setCurrentProduct={setCurrentProduct}
      />
    );
  });

  return (
    <Col>
      <Row>Top reviews from Canada</Row>
      <Col>{categoryLists} </Col>
    </Col>
  );
}

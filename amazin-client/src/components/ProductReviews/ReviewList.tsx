import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductType } from '../../types/types';
import ReviewListItem from './ReviewListItem';

type Props = {
  currentProduct: ProductType;
};

export default function ReviewList(props: Props) {
  const { currentProduct } = props;
  const { reviews } = currentProduct;

  const categoryLists = reviews.map((r) => {
    return <ReviewListItem key={r.id} review={r} />;
  });

  return (
    <Col>
      <Row>Top reviews from Canada</Row>
      <Col>{categoryLists} </Col>
    </Col>
  );
}

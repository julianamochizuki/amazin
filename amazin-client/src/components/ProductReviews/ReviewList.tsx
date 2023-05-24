import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ReviewListItem from './ReviewListItem';

type Props = {
  setReviewsEdited: any;
};

export default function ReviewList(props: Props) {
  const { setReviewsEdited } = props;
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );
  const { reviews } = currentProduct;

  const categoryLists = reviews.map((r) => {
    return (
      <ReviewListItem
        key={r!.id}
        review={r}
        setReviewsEdited={setReviewsEdited}
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

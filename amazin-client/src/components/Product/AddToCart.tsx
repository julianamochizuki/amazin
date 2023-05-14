import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ProductType, UserType } from '../../types/types';

type Props = {
  currentProduct: ProductType;
  vendor: UserType;
};

type Options = {
  weekday: 'long';
  month: 'long';
  day: 'numeric';
};

export default function AddToCart(props: Props) {
  const { currentProduct, vendor } = props;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const options: Options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDeliveryDate = deliveryDate.toLocaleDateString(
    'en-US',
    options
  );

  return (
    <Col xs={12} sm={6} md={3} lg={3} className="add-to-cart-container">
      <Row>${currentProduct.price_cents / 100}</Row>
      <Row>FREE delivery {formattedDeliveryDate}</Row>
      <Row>
        {currentProduct.quantity ? <p> In Stock </p> : <p> Out of Stock </p>}
      </Row>
      <Row>
        <Button className="call-to-action-button">Add to cart</Button>
      </Row>
      <Row>Sold by {vendor.name}</Row>
    </Col>
  );
}

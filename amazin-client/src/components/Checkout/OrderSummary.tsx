import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { CartType } from '../../types/types';

type Props = {
  cart: CartType;
  total: number;
};

export default function OrderSummary(props: Props) {
  const { cart, total } = props;

  return (
    <Col xs={12} md={3}>
      <Button variant="warning">Place your order</Button>
      <Row>
        By placing your order, you agree to Amazin's privacy notice and
        conditions of use.
      </Row>
      <Row>Order Summary</Row>
      <Row>
        <Col>Items ({cart.length}):</Col>
        <Col>${total / 100}</Col>
      </Row>
      <Row>
        <Col>Shipping & Handling:</Col>
        <Col>$0.00</Col>
      </Row>
      <Row>
        <Col>Order Total</Col>
        <Col>${total / 100}</Col>
      </Row>
    </Col>
  );
}

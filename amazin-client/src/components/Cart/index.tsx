import React from 'react';
import { Row } from 'react-bootstrap';
import CartList from './CartList';
import CartTotal from './CartTotal';
import '../../styles/cart.css';

export default function CartReview() {

  return (
    <Row className="cart-container">
      <CartList />
      <CartTotal />
    </Row>
  );
}

import Cookies from 'js-cookie';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

export default function CartTotal() {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const total = useSelector((state: RootState) => state.cart.total);
  const navigate = useNavigate();
  const token = Cookies.get('token') || null;

  return (
    <Col xs={12} md={2} className="cart-total">
      <Row>
        Subtotal ({cart.length} items): ${total / 100}
      </Row>
      <Row>
        <Button
          variant="warning"
          onClick={() => navigate(token ? '/checkout' : '/login')}
        >
          Proceed to Checkout
        </Button>
      </Row>
    </Col>
  );
}

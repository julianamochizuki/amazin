import Cookies from 'js-cookie';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartType } from '../../types/types';

type Props = {
  cart: CartType;
  total: number;
};

export default function CartTotal(props: Props) {
  const { cart, total } = props;
  const navigate = useNavigate();
  const token = Cookies.get('token') || null;

  return (
    <Col xs={12} md={3} className="cart-total">
      <Row className="cart-subtotal subtotal-summary">
        Subtotal ({cart.length} items): ${total}
      </Row>
      <Row className="cart-proceed-checkout">
        <Button
          variant="warning"
          className="cart-proceed-checkout-button"
          onClick={() => navigate(token ? '/checkout' : '/login')}
        >
          Proceed to Checkout
        </Button>
      </Row>
    </Col>
  );
}

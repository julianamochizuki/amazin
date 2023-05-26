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
    <Col xs={12} md={2} className="cart-total">
      <Row>
        Subtotal ({cart.length} items): ${total}
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

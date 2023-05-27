import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../styles/checkout.css';
import { CartType } from '../../types/types';
import CheckoutList from './CheckoutList';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

type Props = {
  cart: CartType;
  setCart: any;
  total: number;
  stripePromise: any;
};

export default function CheckoutDetails(props: Props) {
  const { cart, setCart, total, stripePromise } = props;
  const token = Cookies.get('token') || null;
  const decodedToken: { name?: string; address?: string } | null = token
    ? jwt_decode(token)
    : null;
  const userName = decodedToken?.name || null;
  const userAddress = decodedToken?.address || null;

  return (
    <Col xs={12} md={8} className="checkout-details-section">
      <Row className="checkout-details-container">
        <Col xs={2} md={1}>
          <h4>1</h4>
        </Col>
        <Col xs={10} md={3}>
          <h4>Shipping Address</h4>
        </Col>
        <Col xs={12} md={8}>
          <p>{userName}</p>
          <p>{userAddress}</p>
        </Col>
      </Row>

      <Row className="checkout-details-container">
        <Col xs={2} md={1}>
          <h4>2</h4>
        </Col>
        <Col xs={10} md={3}>
          <h4>Payment Method</h4>
        </Col>
        <Col xs={12} md={8}>
          <Elements stripe={stripePromise}>
            <CardElement />
          </Elements>
        </Col>
      </Row>

      <Row className="checkout-details-container">
        <Col xs={2} md={1}>
          <h4>3</h4>
        </Col>
        <Col xs={10} md={10}>
          <h4>Review items</h4>
        </Col>
        <Col xs={12} md={12}>
          <CheckoutList cart={cart} setCart={setCart} total={total} />
        </Col>
      </Row>
    </Col>
  );
}

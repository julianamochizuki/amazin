import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../styles/checkout.css';
import CheckoutList from './CheckoutList';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

type Props = {
  stripePromise: any;
};

export default function CheckoutDetails(props: Props) {
  const { stripePromise } = props;
  const token = Cookies.get('token') || null;
  const decodedToken: { name?: string; address?: string } | null = token
    ? jwt_decode(token)
    : null;
  const userName = decodedToken?.name || null;
  const userAddress = decodedToken?.address || null;

  return (
    <Col xs={12} md={9} className="checkout-details-section">
      <Row className="checkout-details-container">
        <Col md={1}>
          <h3>1</h3>
        </Col>
        <Col md={2}>
          <h3>Shipping Address</h3>
        </Col>
        <Col md={9}>
          <p>{userName}</p>
          <p>{userAddress}</p>
        </Col>
      </Row>

      <Row className="checkout-details-container">
        <Col md={1}>
          <h3>2</h3>
        </Col>
        <Col md={2}>
          <h3>Payment Method</h3>
        </Col>
        <Col md={9}>
          <Elements stripe={stripePromise}>
            <CardElement />
          </Elements>
        </Col>
      </Row>

      <Row className="checkout-details-container">
        <Col md={1}>
          <h3>3</h3>
        </Col>
        <Col md={2}>
          <h3>Review items</h3>
        </Col>
        <Col md={12}>
          <CheckoutList />
        </Col>
      </Row>
    </Col>
  );
}

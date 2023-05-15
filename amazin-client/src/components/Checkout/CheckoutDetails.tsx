import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../styles/checkout.css';
import { CartType } from '../../types/types';
import CheckoutList from './CheckoutList';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

type Props = {
  cart: CartType;
  setCart: any;
  total: number;
};

export default function CheckoutDetails(props: Props) {
  const { cart, setCart, total } = props;
  const stripePromise = loadStripe('pk_test_51MsyRDGREh42evchBRowAtkBehjiBRRxzcqr8jcxGBRQfJVQyYebrLx4F07PBTDbb9xwT1IViMv21FQ4cZSrsJlB00afg64roT');

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
          <p>John Doe</p>
          <p>1234 Main St</p>
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
            <PaymentForm />
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
          <CheckoutList cart={cart} setCart={setCart} total={total} />
        </Col>
      </Row>
    </Col>
  );
}

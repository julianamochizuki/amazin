import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { CartType } from '../../types/types';
import CheckoutDetails from './CheckoutDetails';
import OrderSummary from './OrderSummary';

type Props = {
  cart: CartType;
  setCart: any;
  total: number;
};

export default function CheckoutReview(props: Props) {
  const { cart, setCart, total } = props;
  const [card, setCard] = useState(null);
  const options = {};
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

  return (
    <Row className="checkout-section">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutDetails
          cart={cart}
          setCart={setCart}
          total={total}
          setCard={setCard}
        />
        <OrderSummary cart={cart} setCart={setCart} total={total} card={card}  />
      </Elements>
    </Row>
  );
}

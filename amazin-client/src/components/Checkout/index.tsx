import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
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
  const [clientSecret, setClientSecret] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:8080/config').then(async (r) => {
  //     const { publishableKey } = await r.json();
  //     setStripePromise(loadStripe(publishableKey));

  //     console.log('publishableKey', publishableKey);
  //   });
  // }, []);

  // useEffect(() => {
  //   fetch('http://localhost:8080/secret').then(async (r) => {
  //     const {client_secret: clientSecret} = await r.json();

  //     console.log('client secret', clientSecret);
  //   });
  // }, []);

  // useEffect(() => {
  //   fetch('/create-payment-intent', {
  //     method: 'POST',
  //     body: JSON.stringify({}),
  //   }).then(async (result) => {
  //     const { clientSecret } = await result.json();
  //     setClientSecret(clientSecret);
  //     console.log('clientSecret', clientSecret);
  //   });
  // }, [total]);

  const options = {};
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

  return (
    <Row className='checkout-section'>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutDetails
          cart={cart}
          setCart={setCart}
          total={total}
          stripePromise={stripePromise}
        />
        <OrderSummary cart={cart} total={total} />
      </Elements>
    </Row>
  );
}

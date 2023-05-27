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
  const [stripePromise, setStripePromise] = useState<any>(null);

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

  return (
    <Row className='checkout-section'>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
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

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import CheckoutDetails from './CheckoutDetails';
import OrderSummary from './OrderSummary';

export default function CheckoutReview() {
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
    <Row>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutDetails
          stripePromise={stripePromise}
        />
        <OrderSummary />
      </Elements>
    </Row>
  );
}

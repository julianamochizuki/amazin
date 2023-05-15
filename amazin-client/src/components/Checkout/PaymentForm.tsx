import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form } from 'react-bootstrap';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  let responseClone: any;

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => {
        responseClone = res.clone();
        return res.json();
      })
      .then(
        (data) => {
          console.log('Success:', data)
          setClientSecret(data.clientSecret);
        },
        function (rejectionReason) {
          // 3
          console.log(
            'Error parsing JSON from response:',
            rejectionReason,
            responseClone
          ); // 4
          responseClone
            .text() // 5
            .then(function (bodyText: any) {
              console.log(
                'Received the following instead of valid JSON:',
                bodyText
              ); // 6
            });
        }
      );
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      console.log('Error:', error);
    } else {
      const { paymentIntent } = await stripe!.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod!.id,
      });

      if (paymentIntent!.status === 'succeeded') {
        console.log('Payment succeeded!');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe || !elements}>
        Pay
      </Button>
    </Form>
  );
}

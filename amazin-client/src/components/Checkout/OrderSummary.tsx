// import { useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { CartType } from '../../types/types';

type Props = {
  cart: CartType;
  total: number;
};

export default function OrderSummary(props: Props) {
  const { cart, total } = props;
  const [message, setMessage] = useState<string | undefined>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(null);
  const url = process.env.REACT_APP_API_SERVER_URL;
  const token = Cookies.get('token') || null;
  const decodedToken: { id?: Number } | null = token ? jwt_decode(token) : null;
  const userId = decodedToken?.id || null;
  // const stripe = useStripe();
  // const elements = useElements();

  //TODO: get paymentId from stripe
  const paymentId = 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!stripe || !elements) {
    //   return;
    // }
    // setIsProcessing(true);

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: `${window.location.origin}/orders`,
    //   },
    // });

    // if (error?.type === 'card_error' || error?.type === 'validation_error') {
    //   setMessage(error.message);
    // } else {
    //   setMessage('An unexpected error occured.');
    // }

    // if (!error) {
    Promise.all([
      /* add new order */
      axios.post(
        `${url}/api/users/${userId}/orders`,
        {
          userId,
          orderItems: {
            createMany: {
              data: cart.map((item) => ({
                productId: item.id,
                quantity: item.quantityInCart,
              })),
            },
          },
          paymentId,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      /* update product quantity */
      cart.map((item) =>
        axios.patch(
          `${url}/api/products/${item.id}`,
          { quantity: item.quantity - item.quantityInCart },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      ),
      /* clear cart */
      localStorage.setItem('cart', JSON.stringify([])),
    ]).then((all) => {
      setOrder(all[0].data);
      window.location.href = '/orders';
    });
    // }
    setIsProcessing(false);
  };

  return (
    <Col xs={12} md={3}>
      <Button
        variant="warning"
        onClick={handleSubmit}
        // disabled={isProcessing || !stripe || !elements}
      >
        Place your order
      </Button>
      {message && <div id="payment-message">{message}</div>}
      <Row>
        By placing your order, you agree to Amazin's privacy notice and
        conditions of use.
      </Row>
      <Row>Order Summary</Row>
      <Row>
        <Col>Items ({cart.length}):</Col>
        <Col>${total / 100}</Col>
      </Row>
      <Row>
        <Col>Shipping & Handling:</Col>
        <Col>$0.00</Col>
      </Row>
      <Row>
        <Col>Order Total</Col>
        <Col>${total / 100}</Col>
      </Row>
    </Col>
  );
}

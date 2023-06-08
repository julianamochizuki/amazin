import { useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { CartType } from '../../types/types';
import '../../styles/checkout.css';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

type Props = {
  cart: CartType;
  total: number;
  card: any;
};

export default function OrderSummary(props: Props) {
  const { cart, total, card } = props;
  const [message, setMessage] = useState<string | undefined>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(null);
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userId = currentUser.id;
  const stripe = useStripe();
  const elements = useElements();
  let paymentId = 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    if (!card) {
      setIsProcessing(false);
      return;
    }

    const amount = total * 100;
    const currency = 'CAD';

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setMessage(error.message);
    } else {
      paymentId = Number(paymentMethod.id);
    }

    await axios
      .post(
        `/api/payments`,
        {
          amount,
          currency,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        stripe.confirmCardPayment(res.data, {
          payment_method: {
            card,
          },
        });
      })
      .then(() => {
        Promise.all([
          /* add new order */
          axios.post(
            `/api/users/${userId}/orders`,
            {
              orderItems: {
                createMany: {
                  data: cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantityInCart,
                  })),
                },
              },
              paymentId: 1,
              total: Number((total * 100).toFixed(0)),
              user: {
                connect: {
                  id: userId,
                },
              },
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
              `/api/products/${item.id}`,
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
      });
    setIsProcessing(false);
  };

  return (
    <Col xs={12} md={3} className="order-total">
      <div className="order-confirmation">
        <Button
          variant="warning"
          className="checkout-button"
          onClick={handleSubmit}
          disabled={isProcessing}
        >
          Place your order
        </Button>
        {message && <div id="payment-message">{message}</div>}
        <Row className="terms-and-conditions">
          By placing your order, you agree to Amazin's privacy notice and
          conditions of use.
        </Row>
      </div>
      <h6 className="order-summary">Order Summary</h6>
      <div className="order-summary-details">
        <Row>
          <Col>Items ({cart.length}):</Col>
          <Col className="price-amount">${total}</Col>
        </Row>
        <Row>
          <Col>Shipping & Handling:</Col>
          <Col className="price-amount">$0.00</Col>
        </Row>
      </div>
      <Row className="order-summary-total">
        <Col>Order Total:</Col>
        <Col className="price-amount">${total}</Col>
      </Row>
    </Col>
  );
}

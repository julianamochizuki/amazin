import { useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { CartType } from '../../types/types';
import '../../styles/checkout.css';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { ExclamationCircle } from 'react-bootstrap-icons';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

type Props = {
  cart: CartType;
  total: number;
  card: any;
  setCart: any;
};

export default function OrderSummary(props: Props) {
  const { cart, setCart, total, card } = props;
  const [message, setMessage] = useState<string | undefined>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(null);
  const [cardComplete, setCardComplete] = useState<boolean>(false);
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const decryptedAddress = CryptoJS.AES.decrypt(
    currentUser.address,
    process.env.REACT_APP_SECRET_KEY!
  ).toString(CryptoJS.enc.Utf8);
  const userId = currentUser.id;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  let paymentId = 0;

  useEffect(() => {
    if (elements) {
      const cardElement = elements.getElement('card');
      if (cardElement) {
        cardElement.on('change', (event) => {
          setCardComplete(event.complete);
        });
      }
    }
  }, [elements]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!cardComplete) {
      setMessage('Your card details are incomplete.');
      setIsProcessing(false);
      return;
    }

    if (!decryptedAddress) {
      setMessage('Your shipping address is incomplete.');
      setIsProcessing(false);
      return;
    }

    const amount = Math.round(total * 100);
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

    setIsProcessing(true);
    if (cardComplete && currentUser.address) {
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
          ])
            .then((all) => {
              /* clear cart */
              localStorage.setItem('cart', JSON.stringify([]));
              const cartData = localStorage.getItem('cart');
              if (cartData) {
                setCart(JSON.parse(cartData));
              }
              setOrder(all[0].data);
              navigate('/orders');
              setIsProcessing(false);
            })
            .catch((e) => {
              setIsProcessing(false);
              console.log('error processing payment', e);
            });
        });
    }
    setIsProcessing(false);
  };

  return (
    <Col xs={12} md={3} className="order-total">
      <div className="order-confirmation">
        <Button
          variant="warning"
          className="checkout-button"
          onClick={handleSubmit}
          disabled={isProcessing || !stripe || !elements}
        >
          Place your order
        </Button>
        {message && (
          <div id="payment-message" className="payment-message">
            <ExclamationCircle /> {message}
          </div>
        )}
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

import React from 'react';
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

  return (
    <Row>
      <CheckoutDetails cart={cart} setCart={setCart} total={total} />
      <OrderSummary cart={cart} total={total} />
    </Row>
  );
}

import React from 'react';
import CheckoutReview from '../../components/Checkout';
import { CartType } from '../../types/types';

type Props = {
  cart: CartType;
  setCart: any;
  total: number;
};

const Checkout = (props: Props) => {
  const { cart, setCart, total } = props;

  return <CheckoutReview cart={cart} setCart={setCart} total={total} />;
};

export default Checkout;

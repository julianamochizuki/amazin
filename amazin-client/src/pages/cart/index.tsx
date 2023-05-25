import React from 'react';
import CartReview from '../../components/Cart';
import { CartType } from '../../types/types';

type Props = {
  cart: CartType;
  setCart: any;
  total: number;
};

const Cart = (props: Props) => {
  const { cart, setCart, total } = props;

  return <CartReview cart={cart} setCart={setCart} total={total} />;
};

export default Cart;

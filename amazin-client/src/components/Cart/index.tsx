import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import CartList from './CartList';
import CartTotal from './CartTotal';
import '../../styles/cart.css';
import { CartType } from '../../types/types';

type Props = {
  cart: CartType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
  total: number;
};

export default function CartReview(props: Props) {
  const { cart, setCart, total } = props;

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, [cart.length]);

  return (
    <Row className="cart-container">
      <CartList cart={cart} setCart={setCart} total={total} />
      <CartTotal cart={cart} total={total} />
    </Row>
  );
}

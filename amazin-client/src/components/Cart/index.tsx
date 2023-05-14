import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import CartList from './CartList';
import CartTotal from './CartTotal';
import '../../styles/cart.css';
import { ProductType } from '../../types/types';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, [cart]);

  const total = cart.reduce((acc, product: ProductType) => {
    return acc + product.price_cents * (product.quantityInCart ?? 0);
  }, 0);

  return (
    <Row className="cart-container">
      <CartList cart={cart} setCart={setCart} total={total} />
      <CartTotal cart={cart} total={total} />
    </Row>
  );
}

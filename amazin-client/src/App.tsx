import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import './App.css';
import NavBar from './components/Navbar';
import Router from './Router';
import theme from './theme/theme';
import '@stripe/stripe-js';
import { CartType } from './types/types';

function App() {
  const [cart, setCart] = useState<CartType>([]);
  const [tokenChanged, setTokenChanged] = useState<boolean>(false);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const total: number = cart.reduce((acc, product) => {
    const price = product.isOnSale
      ? Number(
          ((product.price_cents / 100) *
            (100 - (product.discountPercent ?? 0))) /
            100
        )
      : product.price_cents / 100;

    return acc + price * (product.quantityInCart ?? 0);
  }, 0);

  const roundedTotal: number = Number(total.toFixed(2));

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar
          cart={cart}
          tokenChanged={tokenChanged}
          setTokenChanged={setTokenChanged}
        />
        <Router
          cart={cart}
          setCart={setCart}
          total={roundedTotal}
          tokenChanged={tokenChanged}
          setTokenChanged={setTokenChanged}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

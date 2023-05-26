import React, { useState } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './App.css';
import NavBar from './components/Navbar';
import Router from './Router';
import theme from './theme/theme';
import '@stripe/stripe-js';
import { CartType } from './types/types';

function App() {
  const [cart, setCart] = useState<CartType>([]);

  const total: number = cart.reduce((acc, product) => {
    const price = product.isOnSale
      ? Number(
          (
            (product.price_cents / 100) *
            (100 - (product.discountPercent ?? 0))
          )/100
        )
      : product.price_cents / 100;

    return acc + price * (product.quantityInCart ?? 0);
  }, 0);

  const roundedTotal: number = Number(total.toFixed(2));

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="App"
        style={{ marginTop: '110px', marginBottom: '50px' }}
      >
        <NavBar />
        <Router cart={cart} setCart={setCart} total={roundedTotal} />
      </Container>
    </ThemeProvider>
  );
}

export default App;

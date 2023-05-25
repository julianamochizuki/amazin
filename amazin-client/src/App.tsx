import React, { useState } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './App.css';
import NavBar from './components/Navbar';
import Router from './Router';
import theme from './theme/theme';
import '@stripe/stripe-js';
import { CartItem, CartType, ProductType } from './types/types';

function App() {
  const [cart, setCart] = useState<CartType>([]);

  const total = cart.reduce((acc, product: ProductType) => {
    return acc + product.price_cents * (product.quantityInCart ?? 0);
  }, 0);

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="App"
        style={{ marginTop: '110px', marginBottom: '50px' }}
      >
        <NavBar />
        <Router cart={cart} setCart={setCart} total={total} />
      </Container>
    </ThemeProvider>
  );
}

export default App;

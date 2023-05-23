import React, { useState } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './App.css';
import NavBar from './components/Navbar';
import Router from './Router';
import theme from './theme/theme';
import '@stripe/stripe-js';
import { CartType, ProductType } from './types/types';

function App() {
  const [currentDepartment, setCurrentDepartment] = useState({
    id: 0,
    name: '',
    categories: [],
    createdAt: '',
    updatedAt: '',
  });

  const [currentProduct, setCurrentProduct] = useState({
    id: 0,
    name: '',
    image: '',
    price_cents: 0,
    reviews: [],
    description: '',
    quantity: 0,
    userId: 0,
    createdAt: '',
    updatedAt: '',
  });
  const [cart, setCart] = useState([] as CartType);

  const total = cart.reduce((acc, product: ProductType) => {
    return acc + product.price_cents * (product.quantityInCart ?? 0);
  }, 0);

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="App"
        style={{ marginTop: '110px', marginBottom: '50px' }}
      >
        <NavBar
          currentDepartment={currentDepartment}
          setCurrentDepartment={setCurrentDepartment}
        />
        <Router
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
          cart={cart}
          setCart={setCart}
          total={total}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;

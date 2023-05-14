import React, { useState } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './App.css';
import NavBar from './components/Navbar';
import Router from './Router';
import theme from './theme/theme';

function App() {
  const [currentDepartment, setCurrentDepartment] = useState({
    id: 0,
    name: '',
    categories: [],
    createdAt: '',
    updatedAt: '',
  });
  const [currentCategory, setCurrentCategory] = useState({
    id: 0,
    name: '',
    products: [],
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

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="App"
        style={{ marginTop: '110px', marginBottom: '50px' }}
      >
        <NavBar
          currentDepartment={currentDepartment}
          setCurrentDepartment={setCurrentDepartment}
          setCurrentCategory={setCurrentCategory}
        />
        <Router
          currentCategory={currentCategory}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;

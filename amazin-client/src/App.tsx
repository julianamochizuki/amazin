import React, { useState } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './App.css';
import NavBar from './components/Navbar';
import Router from './Router';

function App() {
  const [currentDepartment, setCurrentDepartment] = useState({
    id: 0,
    name: '',
    categories: [],
  });
  const [currentCategory, setCurrentCategory] = useState({
    id: 0,
    name: '',
    products: [],
  });

  return (
    <ThemeProvider>
      <Container className="App" style={{ marginTop: '110px' }}>
        <NavBar
          currentDepartment={currentDepartment}
          setCurrentDepartment={setCurrentDepartment}
          setCurrentCategory={setCurrentCategory}
        />
        <Router />
      </Container>
    </ThemeProvider>
  );
}

export default App;

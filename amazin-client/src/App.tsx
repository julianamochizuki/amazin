import React from "react";
import { ThemeProvider } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import './App.css';
import NavBar from "./components/Navbar";
import Router from "./Router";

function App() {
  return (
    <ThemeProvider>
      <Container className="App" style={{ marginTop: '100px' }}>
        <NavBar />
        <Router />
      </Container>
    </ThemeProvider>
  );
}

export default App;

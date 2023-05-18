import axios from 'axios';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_SERVER_URL;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/login`, {
        email,
        password,
      });
      if (res.data) {
        setError(false);
        setErrorMessage('');
        Cookies.set('token', res.data);
        navigate('/');
      } else {
        setError(true);
        setErrorMessage('There was a problem signing you in.');
      }
    } catch (e) {
      console.log('Error authenticating user:', e);
      setError(true);
      setErrorMessage("We're sorry, there was a problem signing you in.");
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Image
            src={process.env.PUBLIC_URL + '/logo.png'}
            height="50"
            width="110"
            className="logo"
          />
          {error && (
            <Col>
              <Row>There was a problem</Row>
              <Row>{errorMessage}</Row>
            </Col>
          )}
          <Card className="login-card">
            <Card.Body>
              <Card.Title className="login-title">Sign in</Card.Title>
              <Form className="login-form">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  type="submit"
                  className="login-button"
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </Form>
              <Row className="conditions-text">
                By continuing, you agree to Amazin's Conditions of Use and
                Privacy Notice.
              </Row>
            </Card.Body>
          </Card>
          <Row className="justify-content-center">New to Amazin? </Row>
          <Row className="justify-content-center">
            <Button href="/register">Create your Amazin account</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

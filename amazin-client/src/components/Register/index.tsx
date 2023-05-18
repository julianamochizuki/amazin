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
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/register.css';
import Cookies from 'js-cookie';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_SERVER_URL;

  const handleLogin = async () => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await axios
      .post(`${url}/api/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        if (res.data) {
          setError(false);
          setErrorMessage('');
          handleLogin();
          navigate('/');
        } else {
          setError(true);
          setErrorMessage(res.data.error);
          return;
        }
      })
      .catch((e) => {
        console.log('error registering user: ', e);
      });
  };

  return (
    <Container className="register-container">
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
          <Card className="register-card">
            <Card.Body>
              <Card.Title className="register-title">Create Account</Card.Title>
              <Form className="register-form">
                <Form.Group>
                  <Form.Label>Your name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="First and last name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
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
                  className="register-button"
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </Form>
              <Row className="conditions-text">
                By continuing, you agree to Amazin's Conditions of Use and
                Privacy Notice.
              </Row>
            </Card.Body>
          </Card>
          <Row className="justify-content-center">
            Already have an account? <Link to="/login">Sign in</Link>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

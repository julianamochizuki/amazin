import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login-register.css';
import Cookies from 'js-cookie';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formError, setFormError] = useState({
    name: false,
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_SERVER_URL;

  const handleLogin = () => {
    axios
      .post(`${url}/api/login`, {
        email,
        password,
      })
      .then((res) => {
        setError(false);
        setErrorMessage('');
        Cookies.set('token', res.data);
        navigate('/');
      })
      .catch((e) => {
        console.log('error authenticating user:', e);
        setError(true);
        setErrorMessage("We're sorry, there was a problem signing you in.");
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(email);

    setFormError({
      name: name === '' ? true : false,
      email: !isValidEmail ? true : false,
      password: password === '' ? true : false,
    });

    if (name === '' || !isValidEmail || password === '') {
      return;
    }

    await axios
      .post(`${url}/api/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        setError(false);
        setErrorMessage('');
        handleLogin();
        navigate('/');
      })
      .catch((e) => {
        if (e.response.status === 401) {
          const { error: errorCode, message } = e.response.data;
          setError(true);
          setErrorMessage(message);
          return;
        } else {
          console.log('error registering user:', e);
          setError(true);
          setErrorMessage("We're sorry, there was a problem signing you in.");
        }
      });
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={6} className="register-form-container">
        <Image
          src={process.env.PUBLIC_URL + '/logo.png'}
          height="50"
          width="110"
          className="logo"
        />
        {error && (
          <Col className="mb-3">
            <Row>There was a problem</Row>
            <Row>{errorMessage}</Row>
          </Col>
        )}
        <Card className="register-card">
          <Card.Body>
            <Card.Title className="register-title">Create Account</Card.Title>
            <Form className="register-form">
              <Form.Group className="from-group">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  isInvalid={formError.name}
                  type="name"
                  minLength={2}
                  maxLength={50}
                  placeholder="First and last name"
                  onChange={(e) => {
                    setName(e.target.value);
                    setFormError({ ...formError, name: false });
                  }}
                />
                {formError.name && (
                  <Form.Text className="text-danger">
                    Please add your name
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="from-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  isInvalid={formError.email}
                  minLength={5}
                  maxLength={50}
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormError({ ...formError, email: false });
                  }}
                />
                {formError.email && (
                  <Form.Text className="text-danger">
                    Please add a valid email address
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="from-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  isInvalid={formError.password}
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormError({ ...formError, password: false });
                  }}
                />
                {formError.password && (
                  <Form.Text className="text-danger">
                    Please add a password
                  </Form.Text>
                )}
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
              By continuing, you agree to Amazin's Conditions of Use and Privacy
              Notice.
            </Row>
          </Card.Body>
        </Card>
        <Row className="already-user">
          <span>
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </Row>
      </Col>
    </Row>
  );
}

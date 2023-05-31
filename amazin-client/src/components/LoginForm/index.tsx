import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/login-register.css';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_SERVER_URL;
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setFormError({
      email: email === '' ? true : false,
      password: password === '' ? true : false,
    });

    if (email === '' || password === '') {
      return;
    }

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
        if (e.response.status === 401) {
          const { error: errorCode, message } = e.response.data;
          setError(true);
          setErrorMessage(message);
        } else {
          console.log('error authenticating user:', e);
          setError(true);
          setErrorMessage("We're sorry, there was a problem signing you in.");
        }
      });
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={6} className="login-form-container">
        <Image
          src={process.env.PUBLIC_URL + '/logo.png'}
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
              <Form.Group className="from-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  isInvalid={formError.email}
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormError({ ...formError, email: false });
                  }}
                />
                {formError.email && (
                  <Form.Text className="text-danger">
                    Please add your email address
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
                    Please add your password
                  </Form.Text>
                )}
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
              By continuing, you agree to Amazin's Conditions of Use and Privacy
              Notice.
            </Row>
          </Card.Body>
        </Card>
        <div className="new-user">
          <Row className="justify-content-center">New to Amazin? </Row>
          <Row className="justify-content-center">
            <Button
              variant="light"
              className="button-to-register"
              onClick={() => navigate('/register')}
            >
              Create your Amazin account
            </Button>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

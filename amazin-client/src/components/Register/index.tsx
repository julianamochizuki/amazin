import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/login-register.css';
import Cookies from 'js-cookie';
import { setCurrentUser } from '../../app/userReducer';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import CryptoJS from 'crypto-js';

type Props = {
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RegisterForm(props: Props) {
  const { setTokenChanged } = props;
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
  const location = useLocation();
  const dispatch = useDispatch();

  const isStore = location.pathname === '/seller/register' ? true : false;

  const handleLogin = () => {
    axios
      .post(`/api/login`, {
        email,
        password,
      })
      .then((res) => {
        setError(false);
        setErrorMessage('');
        Cookies.set('token', res.data);
        const decodedToken: {
          name?: string;
          address?: string;
          email?: string;
          isSeller?: boolean;
          id?: number;
        } | null = res.data ? jwt_decode(res.data) : null;
        const user = {
          name: CryptoJS.AES.encrypt(
            decodedToken?.name!,
            process.env.REACT_APP_SECRET_KEY!
          ).toString(),
          address: CryptoJS.AES.encrypt(
            decodedToken?.address!,
            process.env.REACT_APP_SECRET_KEY!
          ).toString(),
          email: CryptoJS.AES.encrypt(
            decodedToken?.email!,
            process.env.REACT_APP_SECRET_KEY!
          ).toString(),
          isSeller: decodedToken?.isSeller,
          id: decodedToken?.id,
        };
        dispatch(setCurrentUser(user));
        setTokenChanged((prev) => !prev);
        navigate('/');
      })
      .catch((e) => {
        if (e.response.status === 401) {
          const { message } = e.response.data;
          setError(true);
          setErrorMessage(message);
        } else {
          console.log('error authenticating user:', e);
          setError(true);
          setErrorMessage("We're sorry, there was a problem signing you in.");
        }
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const isValidName = nameRegex.test(name);
    const isValidEmail = emailRegex.test(email);

    setFormError({
      name: !isValidName ? true : false,
      email: !isValidEmail ? true : false,
      password: password === '' ? true : false,
    });

    if (!isValidName || !isValidEmail || password === '') {
      return;
    }

    await axios
      .post(`/api/register`, {
        name,
        email,
        password,
        isSeller: isStore ? true : false,
      })
      .then((res) => {
        setError(false);
        setErrorMessage('');
        handleLogin();
      })
      .catch((e) => {
        if (e.response.status === 401) {
          const { message } = e.response.data;
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
      <Col xs={12} md={6} className="register-form-container mt-5">
        {error && (
          <Col className="mb-3">
            <Row>There was a problem</Row>
            <Row>{errorMessage}</Row>
          </Col>
        )}
        <Card className="register-card">
          <Card.Body>
            <Card.Title className="register-title mb-3">
              Create Account
            </Card.Title>
            <Form className="register-form">
              <Form.Group className="from-group">
                <Form.Label>
                  {isStore ? 'Your store name' : 'Your name'}
                </Form.Label>
                <Form.Control
                  isInvalid={formError.name}
                  type="name"
                  minLength={2}
                  maxLength={50}
                  placeholder={isStore ? 'Store name' : 'First and last name'}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFormError({ ...formError, name: false });
                  }}
                />
                {formError.name && (
                  <Form.Text className="text-danger">
                    {isStore
                      ? 'Please add your store name'
                      : 'Please add your name'}
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
            Already have an account?{' '}
            <Link to={isStore ? '/seller/login' : '/login'}>Sign in</Link>
          </span>
        </Row>
      </Col>
    </Row>
  );
}

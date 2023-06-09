import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Alert } from 'react-bootstrap';
import '../../styles/checkout.css';
import { CartType } from '../../types/types';
import CheckoutList from './CheckoutList';
import { CardElement, useElements } from '@stripe/react-stripe-js';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import CryptoJS from 'crypto-js';
import { setCurrentUser } from '../../app/userReducer';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

type Props = {
  cart: CartType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
  total: number;
  setCard: React.Dispatch<React.SetStateAction<any>>;
};

export default function CheckoutDetails(props: Props) {
  const { cart, setCart, total, setCard } = props;
  const [showAddressForm, setShowAddressForm] = useState(false);
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userId = currentUser.id;
  const userName = CryptoJS.AES.decrypt(
    currentUser.name,
    process.env.REACT_APP_SECRET_KEY!
  ).toString(CryptoJS.enc.Utf8);
  const decryptedAddress = CryptoJS.AES.decrypt(
    currentUser.address,
    process.env.REACT_APP_SECRET_KEY!
  ).toString(CryptoJS.enc.Utf8);
  const [userAddress, setUserAddress] = useState(decryptedAddress);
  const dispatch = useDispatch();
  const elements = useElements();

  useEffect(() => {
    setUserAddress(decryptedAddress);
  }, [currentUser]);

  useEffect(() => {
    if (elements) {
      setCard(elements.getElement(CardElement));
    }
  }, [elements]);

  const handleAddressUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .patch(
        `/api/users/${userId}`,
        { address: userAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setShowAddressForm(false);
        Cookies.set('token', res.data);
        const decodedToken: {
          address?: string;
        } | null = res.data ? jwt_decode(res.data) : null;
        setUserAddress(decodedToken?.address!);
        const userAddress = CryptoJS.AES.encrypt(
          decodedToken?.address!,
          process.env.REACT_APP_SECRET_KEY!
        ).toString();

        dispatch(setCurrentUser({ ...currentUser, address: userAddress }));
      })
      .catch((e) => {
        console.log('error updating user address', e);
      });
  };

  return (
    <Col xs={12} md={8} className="checkout-details-section">
      <Row className="checkout-details-container">
        <Col xs={2} md={1}>
          <h5>1</h5>
        </Col>
        <Col xs={10} md={3}>
          <h5>Shipping Address</h5>
        </Col>
        <Col xs={12} md={8}>
          <p>{userName}</p>
          {!showAddressForm ? (
            userAddress
          ) : (
            <Form onSubmit={handleAddressUpdate}>
              <Form.Control
                type="text"
                placeholder="Shipping address"
                value={userAddress}
                onChange={(e) => {
                  const newAddress = e.target.value;
                  setUserAddress(newAddress);
                }}
                className="user-address-input mb-3"
              />
              <Button variant="light" type="submit">
                Save
              </Button>
              <Button variant="light" onClick={() => setShowAddressForm(false)}>
                Cancel
              </Button>
            </Form>
          )}
          {!showAddressForm && (
            <Col
              variant="light"
              className="user-address-update pointer-cursor"
              onClick={() =>
                showAddressForm
                  ? setShowAddressForm(false)
                  : setShowAddressForm(true)
              }
            >
              {userAddress ? 'Change' : 'Add'}{' '}
            </Col>
          )}
        </Col>
      </Row>

      <Row className="checkout-details-container">
        <Col xs={2} md={1}>
          <h5>2</h5>
        </Col>
        <Col xs={10} md={3}>
          <h5>Payment Method</h5>
        </Col>
        <Col xs={12} md={8}>
          {/* <Elements stripe={stripePromise}> */}
          <CardElement />
          {/* </Elements> */}
          <Col className="test-card-info">
            <Alert variant="warning">
              <span className="test-card-label">
                To simulate a successful payment, use the Stripe test card
                below:
              </span>
              <br />
              <span className="test-card-details">
                Card number: 4242 4242 4242 4242 | Date: any future date | CVC:
                any 3 digits | ZIP: any 5 digits
              </span>
            </Alert>
          </Col>
        </Col>
      </Row>

      <Row className="checkout-details-container">
        <Col xs={2} md={1}>
          <h5>3</h5>
        </Col>
        <Col xs={10} md={10}>
          <h5>Review items</h5>
        </Col>
        <Col xs={12} md={12}>
          <CheckoutList cart={cart} setCart={setCart} total={total} />
        </Col>
      </Row>
    </Col>
  );
}

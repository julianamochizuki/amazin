import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import '../../styles/profile.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentUser } from '../../app/userReducer';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>;
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserAccount(props: Props) {
  const { setView, setTokenChanged } = props;
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const id = currentUser.id;
  const name = CryptoJS.AES.decrypt(
    currentUser.name,
    process.env.REACT_APP_SECRET_KEY!
  ).toString(CryptoJS.enc.Utf8);
  const email = CryptoJS.AES.decrypt(
    currentUser.email,
    process.env.REACT_APP_SECRET_KEY!
  ).toString(CryptoJS.enc.Utf8);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name, email });
  const [nameDisabled, setNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const initialErrorState = { name: false, email: false };
  const [formError, setFormError] = useState(initialErrorState);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setForm({
      name,
      email,
    });
  }, [currentUser]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const isValidName = nameRegex.test(form.name);
    const isValidEmail = emailRegex.test(form.email);

    setFormError({
      name: !isValidName ? true : false,
      email: !isValidEmail ? true : false,
    });

    if (!isValidName || !isValidEmail) {
      return;
    }

    axios
      .patch(
        `/api/users/${id}`,
        {
          name: form.name,
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setFormError(initialErrorState);
        setError(false);
        setErrorMessage('');
        Cookies.set('token', res.data);
        const decodedToken: {
          name?: string;
          email?: string;
        } | null = res.data ? jwt_decode(res.data) : null;

        const name = CryptoJS.AES.encrypt(
          decodedToken?.name!,
          process.env.REACT_APP_SECRET_KEY!
        ).toString();
        const email = CryptoJS.AES.encrypt(
          decodedToken?.email!,
          process.env.REACT_APP_SECRET_KEY!
        ).toString();
        dispatch(setCurrentUser({ ...currentUser, name, email }));
        setTokenChanged(true);
        setNameDisabled(true);
        setEmailDisabled(true);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          const { message } = e.response.data;
          setError(true);
          setErrorMessage(message);
          return;
        } else {
          console.log('error updating user info:', e);
          setError(true);
          setErrorMessage(
            "We're sorry, there was a problem updating your account."
          );
        }
      });
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
      {error && (
        <Col className="mb-3">
          <Row>There was a problem</Row>
          <Row>{errorMessage}</Row>
        </Col>
      )}
      <Card className="profile-card">
        <Card.Body>
          <h4 className="mb-4">Login & Security</h4>
          <Form>
            <Form.Group as={Row} controlId="formBasicName">
              <Form.Label column sm={4} className="text-end">
                Name:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  isInvalid={formError.name}
                  type="text"
                  value={form.name}
                  disabled={nameDisabled}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setFormError({ ...formError, name: false });
                  }}
                />
                {formError.name && (
                  <Form.Text className="text-danger">
                    Please add a name
                  </Form.Text>
                )}
              </Col>
              <Col sm={12} className="mt-3 mb-3 text-end">
                <Button
                  className="edit-link"
                  variant="light"
                  onClick={() => setNameDisabled(false)}
                  disabled={id === 2 || id === 3}
                >
                  Edit
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formBasicEmail">
              <Form.Label column sm={4} className="text-end">
                Email:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  isInvalid={formError.email}
                  type="email"
                  minLength={5}
                  maxLength={50}
                  value={form.email}
                  disabled={emailDisabled}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setFormError({ ...formError, email: false });
                  }}
                />
                {formError.email && (
                  <Form.Text className="text-danger">
                    Please add a valid email address
                  </Form.Text>
                )}
              </Col>
              <Col sm={12} className="mt-3 mb-3 text-end">
                <Button
                  variant="light"
                  className="edit-link"
                  onClick={() => setEmailDisabled(false)}
                  disabled={id === 2 || id === 3}
                >
                  Edit
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formBasicPassword">
              <Form.Label column sm={4} className="text-end">
                Password:
              </Form.Label>
              <Col sm={8}>
                <Form.Control type="password" value="********" disabled />
              </Col>
              <Col sm={12} className="mt-3 text-end">
                <Button
                  variant="light"
                  className="edit-link"
                  onClick={() => setView('CHANGE_PASSWORD')}
                  disabled={id === 2 || id === 3}
                >
                  Edit
                </Button>
              </Col>
            </Form.Group>
            {(id === 2 || id === 3) && (
              <Alert variant="warning" className="edition-note">
                Edit buttons are disabled for demo user and demo seller. To
                simulate the editing feature, please create an account.
              </Alert>
            )}
            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="warning"
                className="save-button"
                onClick={handleSubmit}
              >
                Save changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

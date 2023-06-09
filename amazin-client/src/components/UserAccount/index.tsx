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
  const [error, setError] = useState(initialErrorState);

  useEffect(() => {
    setForm({
      name,
      email,
    });
  }, [currentUser]);

  const handleClick = () => {
    setError({
      name: form.name === '' ? true : false,
      email: form.email === '' ? true : false,
    });

    if (form.name === '' || form.email === '') {
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
        console.log('error updating user info:', e);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center pt-5">
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
                  isInvalid={error.name}
                  type="text"
                  value={form.name}
                  disabled={nameDisabled}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setError({ ...error, name: false });
                  }}
                />
                {error.name && (
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
                  isInvalid={error.email}
                  type="email"
                  value={form.email}
                  disabled={emailDisabled}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setError({ ...error, email: false });
                  }}
                />
                {error.email && (
                  <Form.Text className="text-danger">
                    Please add an email address
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
            <Alert variant="warning" className="edition-note">
              Edit option is disabled for demo user and demo seller. To simulate
              the editing feature, please create an account.
            </Alert>
            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="warning"
                className="save-button"
                onClick={handleClick}
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

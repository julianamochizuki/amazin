import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import '../../styles/profile.css';

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>;
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserAccount(props: Props) {
  const { setView, setTokenChanged } = props;
  const token = Cookies.get('token') || null;
  let decodedToken: { id?: Number; name?: string; email?: string } | null =
    token ? jwt_decode(token) : null;
  const id = decodedToken?.id;
  const name = decodedToken?.name;
  const email = decodedToken?.email;
  const [form, setForm] = useState({ name, email });
  const [nameDisabled, setNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const initialErrorState = { name: false, email: false };
  const [error, setError] = useState(initialErrorState);

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
        `${process.env.REACT_APP_API_SERVER_URL}/api/users/${id}`,
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
        setTokenChanged((prev) => !prev);
        decodedToken = jwt_decode(res.data);
        setForm({ name: decodedToken?.name, email: decodedToken?.email });
        setNameDisabled(true);
        setEmailDisabled(true);
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
                >
                  Edit
                </Button>
              </Col>
            </Form.Group>
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

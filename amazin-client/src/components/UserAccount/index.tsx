import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

type Props = {
  setView: (view: string) => void;
};

export default function UserAccount(props: Props) {
  const { setView } = props;
  const token = Cookies.get('token') || null;
  let decodedToken: { id?: Number; name?: string; email?: string } | null =
    token ? jwt_decode(token) : null;
  const id = decodedToken?.id;
  const name = decodedToken?.name;
  const email = decodedToken?.email;
  const [form, setForm] = useState({ name, email });
  const [nameDisabled, setNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);

  const handleClick = () => {
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
        decodedToken = jwt_decode(res.data);
        setForm({ name: decodedToken?.name, email: decodedToken?.email });
      });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ width: '30rem', alignSelf: 'center' }}>
        <Card.Body>
          <h1 className="h4">Login & Security</h1>
          <Form>
            <Form.Group as={Row} controlId="formBasicName">
              <Form.Label column sm={4} className="text-end">
                Name:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  value={form.name}
                  disabled={nameDisabled}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Col>
              <Col sm={12} className="mt-3 text-end">
                <Button variant="link" onClick={() => setNameDisabled(false)}>
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
                  type="email"
                  value={form.email}
                  disabled={emailDisabled}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Col>
              <Col sm={12} className="mt-3 text-end">
                <Button variant="link" onClick={() => setEmailDisabled(false)}>
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
                  variant="link"
                  onClick={() => setView('CHANGE_PASSWORD')}
                >
                  Edit
                </Button>
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleClick}>
              Save changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

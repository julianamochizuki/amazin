import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  setView: (view: string) => void;
};

export default function ChangePassword(props: Props) {
  const { setView } = props;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const token = Cookies.get('token') || null;
  let decodedToken: { id?: Number; name?: string; email?: string } | null =
    token ? jwt_decode(token) : null;
  const id = decodedToken?.id;

  const handleClick = () => {
    if (form.newPassword !== form.confirmPassword) {
      setError(true);
      setErrorMessage('Passwords do not match');
      return;
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_SERVER_URL}/api/users/${id}/password`,
          {
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert('Password changed successfully');
            setView('PROFILE');
          }
        })
        .catch((e) => {
          if (e.response.status === 401) {
            setError(true);
            setErrorMessage('Your current password is incorrect');
          } else {
            setError(true);
            setErrorMessage('An error occurred');
          }
        });
    }
  };

  return (
    <Container
      className="d-flex-column justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <h2 className="text-center">Change Password</h2>
      <Card className="text-start" style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Text>
            Use the form below to change the password for your Amazin account
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Current password:</Form.Label>
                <Form.Control
                  type="password"
                  id="oldPassword"
                  onChange={(e) =>
                    setForm({ ...form, oldPassword: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New password:</Form.Label>
                <Form.Control
                  type="password"
                  id="newPassword"
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Reenter new password:</Form.Label>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
              </Form.Group>
              <Button className="btn btn-primary" onClick={handleClick}>
                Save changes
              </Button>
              {error && (
                <Alert variant="danger" key="danger">
                  {errorMessage}
                </Alert>
              )}
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>;
};

export default function ChangePassword(props: Props) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errorForm, setErrorForm] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const id = currentUser.id;

  const handleClick = () => {
    setErrorForm({
      oldPassword: form.oldPassword === '' ? true : false,
      newPassword: form.newPassword === '' ? true : false,
      confirmPassword: form.confirmPassword === '' ? true : false,
    });

    if (
      form.oldPassword === '' ||
      form.newPassword === '' ||
      form.confirmPassword === ''
    ) {
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError(true);
      setErrorMessage('Passwords do not match');
      return;
    } else {
      axios
        .patch(
          `/api/users/${id}/password`,
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
            alert('Password changed successfully.');
            navigate('/');
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
    <Container className="d-flex justify-content-center align-items-center pt-5">
      <Card className="text-start change-password-card">
        <h4 className="mb-2 text-start">Change Password</h4>
        <Card.Body>
          <Card.Text>
            <Form>
              <p className="change-password-text">
                Use the form below to change the password for your Amazin
                account
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Current password:</Form.Label>
                <Form.Control
                  isInvalid={errorForm.oldPassword}
                  type="password"
                  id="oldPassword"
                  onChange={(e) => {
                    setForm({ ...form, oldPassword: e.target.value });
                    setErrorForm({ ...errorForm, oldPassword: false });
                  }}
                />
                {errorForm.oldPassword && (
                  <Form.Text className="text-danger">
                    Please add your current password
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New password:</Form.Label>
                <Form.Control
                  isInvalid={errorForm.newPassword}
                  type="password"
                  id="newPassword"
                  onChange={(e) => {
                    setForm({ ...form, newPassword: e.target.value });
                    setErrorForm({ ...errorForm, newPassword: false });
                  }}
                />
                {errorForm.newPassword && (
                  <Form.Text className="text-danger">
                    Please add a new password
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Reenter new password:</Form.Label>
                <Form.Control
                  isInvalid={errorForm.confirmPassword}
                  type="password"
                  id="confirmPassword"
                  onChange={(e) => {
                    setForm({ ...form, confirmPassword: e.target.value });
                    setErrorForm({ ...errorForm, confirmPassword: false });
                  }}
                />
                {errorForm.confirmPassword && (
                  <Form.Text className="text-danger">
                    Please reenter your new password
                  </Form.Text>
                )}
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
              {error && (
                <Alert variant="danger" key="danger" className="mt-3 p-2">
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

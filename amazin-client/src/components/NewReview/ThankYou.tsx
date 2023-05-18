import React from 'react';
import { Alert } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';

export default function ThankYou() {
  return (
    <Alert variant="success">
      <CheckCircleFill /> Review submitted - Thank you!
    </Alert>
  );
}
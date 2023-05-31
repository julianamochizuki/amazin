import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SellOnAmazin() {
  const navigate = useNavigate();

  return (
    <Container fluid className="sell-on-amazin">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="sell-on-amazin-title">Become an Amazin seller</h1>
          <p className="sell-on-amazin-description">
            On average, Canadian SMBs sell more than 110 products a minute in
            our stores.
          </p>
          <Button
            variant="warning"
            size="lg"
            className="sell-on-amazin-button"
            onClick={() => {
              navigate('/seller/register');
            }}
          >
            Sign up
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

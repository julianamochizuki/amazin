import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function SellOnAmazin() {
  return (
    <Container
      className="d-flex-column justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Row >Sell on Amazin</Row>
      <Row>
        <Col xs={12} md={8}>
          <h2>Become an Amazin seller</h2>
          <p>On average, Canadian SMBs sell more than 110 products a minute in our stores.</p>
        </Col>
        <Col xs={12} md={4}>
          
        </Col>
      </Row>
    </Container>
  );
}

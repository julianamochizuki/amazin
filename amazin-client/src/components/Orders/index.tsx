import React from 'react';
import { Col, Row } from 'react-bootstrap';
import OrderList from './OrderList';

export default function Orders() {
  return (
    <Col>
      <Row>Your Orders</Row>
      <Row>
        <OrderList />
      </Row>
    </Col>
  );
}

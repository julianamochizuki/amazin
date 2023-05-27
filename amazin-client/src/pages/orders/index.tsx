import React from 'react';
import { Col } from 'react-bootstrap';
import OrderList from '../../components/Orders/OrderList';
import '../../styles/orders.css';

export default function Orders() {
  return (
    <Col className="orders-section">
      <OrderList />
    </Col>
  );
}

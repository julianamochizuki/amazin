import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { OrderType } from '../../types/types';

type Props = {
  order: OrderType;
};

export default function OrderListItem(props: Props) {
  const { order } = props;
  const deliveryDate = new Date(order.createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  return (
    <Card>
      <Card.Title>
        <Col>
          <Row>
            <Col>Order Placed</Col>
            <Col>Total</Col>
          </Row>
          <Row>
            <Col>{order.createdAt}</Col>
            <Col>{order.total / 100}</Col>
          </Row>
        </Col>
        <Col>Order #{order.id}</Col>
      </Card.Title>
      <Card.Text>
        <Row>Delivered {deliveryDate.toDateString()}</Row>
        <Row>
          Your package was delivered. It was handed directly to a resident.
        </Row>
        {order.orderItems.map((item) => (
          <Row key={item.id}>
            <Col>
              <Image className="product-image" src={item.product.image} />
            </Col>
            <Col>{item.product.name}</Col>
            <Col>
              <Button variant="warning">Write a product review</Button>
            </Col>
          </Row>
        ))}
      </Card.Text>
    </Card>
  );
}

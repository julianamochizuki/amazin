import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { OrderType } from '../../types/types';
import '../../App.css'

type Props = {
  order: OrderType;
  setCurrentProduct: any;
};

export default function OrderListItem(props: Props) {
  const { order, setCurrentProduct } = props;
  const navigate = useNavigate();

  // considering 3 days for delivery
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
            <Col
              className="pointer-cursor"
              onClick={() => {
                navigate(`/products/${item.product.id}`);
              }}
            >
              <Image className="product-image" src={item.product.image} />
            </Col>
            <Col
              className="pointer-cursor"
              onClick={() => {
                navigate(`/products/${item.product.id}`);
              }}
            >
              {item.product.name}
            </Col>
            <Col>
              <Button
                variant="warning"
                onClick={() => {
                  setCurrentProduct(item.product);
                  navigate(`/write-a-review`);
                }}
              >
                Write a product review
              </Button>
            </Col>
          </Row>
        ))}
      </Card.Text>
    </Card>
  );
}

import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { OrderType } from '../../types/types';
import '../../App.css';

type Props = {
  order: OrderType;
  setCurrentProduct: any;
};

export default function OrderListItem(props: Props) {
  const { order, setCurrentProduct } = props;
  const navigate = useNavigate();
  const today = new Date();
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
        <Row>
          {today > deliveryDate
            ? `Delivered ${deliveryDate.toDateString()}`
            : 'Arriving soon'}
        </Row>

        <Row>
          {today > deliveryDate
            ? 'Your package was delivered. It was handed directly to a resident.'
            : `Your package is on the way. It will be delivered by ${deliveryDate}.`}
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
            {/* {today > deliveryDate && ( */}
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
            {/* )} */}
          </Row>
        ))}
      </Card.Text>
    </Card>
  );
}

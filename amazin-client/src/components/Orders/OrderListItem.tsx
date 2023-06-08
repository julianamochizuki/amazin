import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { OrderType } from '../../types/types';
import '../../App.css';
import '../../styles/orders.css';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../app/productReducer';

type Props = {
  order: OrderType;
};

export default function OrderListItem(props: Props) {
  const dispatch = useDispatch();
  const { order } = props;
  const navigate = useNavigate();
  const today = new Date();
  // considering 3 days for delivery
  const deliveryDate = new Date(order.createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedDeliveredDate = deliveryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedCreatedAt = new Date(order.createdAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <Card className="card-order">
      <Card.Title>
        <Row className="card-header order-details">
          <Col xs={12} md={3} className="order-info-column">
            <div>Order Placed</div>
            <div>{formattedCreatedAt}</div>
          </Col>
          <Col xs={12} md={2} className="order-info-column">
            <div>Total</div>
            <div>${order.total / 100}</div>
          </Col>
          <Col xs={12} md={7} className="order-info-column  order-number">
            <div>Order #{order.id}</div>
          </Col>
        </Row>
      </Card.Title>
      <Card.Text>
        {order.orderItems.map((item) => (
          <Row className="order-product-item" key={item.id}>
            <Col
              xs={12}
              md={2}
              className="pointer-cursor"
              onClick={() => {
                navigate(`/products/${item.product!.id}`);
              }}
            >
              <Image
                className="order-product-image"
                src={item.product!.image}
              />
            </Col>
            <Col xs={12} md={5}>
              <Row>{item.product!.name}</Row>
              {today < deliveryDate && (
                <Row className="delivery-info">On the way</Row>
              )}
              <Row className="delivery-info">
                {today > deliveryDate
                  ? `Your package was delivered. It was handed directly to a resident. Delivery date: ${formattedDeliveredDate}.`
                  : `Delivery estimate: 
                  ${formattedDeliveryDate}.`}
              </Row>
            </Col>

            {today > deliveryDate && (
              <Col xs={12} md={4} className="button-container">
                <Button
                  variant="light"
                  className="button-review"
                  onClick={() => {
                    dispatch(setCurrentProduct(item.product));
                    navigate(`/products/${item.product.id}/write-a-review`);
                  }}
                >
                  Write a product review
                </Button>
              </Col>
            )}
          </Row>
        ))}
      </Card.Text>
    </Card>
  );
}

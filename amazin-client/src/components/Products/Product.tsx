import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import StarRating from './Rating';
import '../../styles/products.css';

type Props = {
  currentProduct: {
    id: number;
    name: string;
    image: string;
    price_cents: number;
    reviews: any[];
  };
};

export default function ProductDetails(props: Props) {
  const { currentProduct } = props;

  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      lg={3}
      key={currentProduct.id}
      style={{ borderRadius: 3 }}
    >
      <Card className="card-container">
        <Card.Img
          variant="top"
          src={currentProduct.image}
          className="card-image"
          style={{ height: 200 }}
        />
        <Card.Body className="card-body">
          <Card.Text className="card-title">{currentProduct.name}</Card.Text>
          {currentProduct.reviews.length > 0 && (
            <StarRating reviews={currentProduct.reviews} />
          )}
          <Card.Text className="card-price">
            ${currentProduct.price_cents / 100}
          </Card.Text>
          <Button className="card-button">Add to cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

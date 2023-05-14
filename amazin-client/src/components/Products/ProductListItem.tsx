import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import StarRating from './Rating';
import '../../styles/products.css';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  id: number;
  image: string;
  price_cents: number;
  reviews: any[];
  setCurrentProduct: any;
};

export default function ProductListItem(props: Props) {
  const { id, name, image, price_cents, reviews, setCurrentProduct } = props;

  return (
    <Col xs={12} sm={6} md={4} lg={3} key={id} style={{ borderRadius: 3 }}>
      <Card className="card-container">
        <Card.Img
          variant="top"
          src={image}
          className="card-image"
          style={{ height: 200 }}
        />
        <Card.Body className="card-body">
          <Card.Text className="card-title">{name}</Card.Text>
          {reviews.length > 0 && <StarRating reviews={reviews} />}
          <Card.Text className="card-price">${price_cents / 100}</Card.Text>
          <Button
            className="card-button"
            onClick={() => {
              setCurrentProduct({
                id,
                name,
                image,
                price_cents,
                reviews,
              });
            }}
          >
            <Link to={`/products/${id}`}>See product details</Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

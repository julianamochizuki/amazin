import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import StarRating from './Rating';
import '../../styles/products.css';
import { Link } from 'react-router-dom';
import { ProductType } from '../../types/types';

type Props = {
  product: ProductType;
  setCurrentProduct: any;
};

export default function ProductListItem(props: Props) {
  const { product, setCurrentProduct } = props;

  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      lg={3}
      key={product.id}
      style={{ borderRadius: 3 }}
    >
      <Card className="card-container">
        <Card.Img
          variant="top"
          src={product.image}
          className="card-image"
          style={{ height: 200 }}
        />
        <Card.Body className="card-body">
          <Card.Text key={product.id} className="card-title">{product.name}</Card.Text>
          {product.reviews.length > 0 && (
            <StarRating  reviews={product.reviews} />
          )}
          <Card.Text className="card-price">
            ${product.price_cents / 100}
          </Card.Text>
          <Button
            className="call-to-action-button"
            onClick={() => {
              setCurrentProduct({
                ...product,
              });
            }}
          >
            <Link to={`/products/${product.id}`}>See product details</Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import StarRating from './Rating';

type Props = {
  name: string;
  id: number;
  image: string;
  price_cents: number;
  reviews: any[];
};

export default function ProductListItem(props: Props) {
  const { id, name, image, price_cents, reviews } = props;

  return (
    <Col xs={12} sm={6} md={4} lg={3} key={id}>
      <Card style={{ marginTop: '30px' }}>
        <Card.Img
          variant="top"
          src={image}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Card.Text
            style={{
              display: 'flex',
              textAlign: 'left',
              fontSize: '16px',
            }}
          >
            {name}
          </Card.Text>
          {reviews.length > 0 && <StarRating reviews={reviews} />}
          <Card.Text
            style={{
              fontSize: '24px',
              fontWeight: 'medium',
              color: '#0F1111',
            }}
          >
            ${price_cents / 100}
          </Card.Text>
          <Button variant="warning">See product details</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

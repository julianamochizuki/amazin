import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';

const DealsListItem = function (props: any) {
  const { title, discount, image } = props;

  return (
    <Container>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Img src={image} />
        <Card.Text>Up to {discount} off</Card.Text>
      </Card>
    </Container>
  );
};

export default DealsListItem;

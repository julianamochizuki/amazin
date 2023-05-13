import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  id: number;
  image: string;
};

export default function ProductListItem(props: Props) {
  const { name, image } = props;

  return (
    <Card>
      <Card.Title>{name}</Card.Title>
      <Card.Img src={image} />
      <Link to="">Add to Cart</Link>
    </Card>
  );
}

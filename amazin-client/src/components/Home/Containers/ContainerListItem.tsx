import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ContainerListItem = function (props: any) {
  const { title, image } = props;

  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Img src={image} />
      <Link to="">Shop now</Link>
    </Card>
  );
};

export default ContainerListItem;

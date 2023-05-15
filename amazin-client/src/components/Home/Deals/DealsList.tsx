import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DealsListItem from './DealsListItem';

const DealsList = function () {
  type Deal = {
    id: number;
    title: string;
    image: string;
    discount: number;
  };

  const deals: Deal[] = [
    {
      id: 1,
      title: 'Kindle E-Readers',
      image: process.env.PUBLIC_URL + '/images/ShopByCategory1.jpg',
      discount: 10,
    },
    {
      id: 2,
      title: 'Lipstick',
      image: process.env.PUBLIC_URL + '/images/ShopByCategory1.jpg',
      discount: 20,
    },
  ];

  const DealsList = deals.map((d) => {
    return (
      <Col key={d.id}>
        <DealsListItem title={d.title} image={d.image} discount={d.discount} />
      </Col>
    );
  });

  return (
    <Container>
      <h3>Deals</h3>
      <Row>{DealsList}</Row>
    </Container>
  );
};

export default DealsList;

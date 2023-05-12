import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContainerListItem from './ContainerListItem';

const ContainerList = function () {
  type Container = {
    title: string;
    image: string;
  };

  const containers: Container[] = [
    {
      title: "Today's Deals",
      image:
        'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
    },
    {
      title: 'Save on Electronics',
      image:
        'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
    },
    {
      title: 'Gift Cards',
      image: 'https://images.unsplash.com/photo-1620843437920-ead942b3abd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Home & Kitchen',
      image:
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
  ];

  const containerList = containers.map((c) => {
    return (
      <Col>
        <ContainerListItem key={c.title} title={c.title} image={c.image} />
      </Col>
    );
  });

  return (
    <Container>
      <Row>{containerList}</Row>
    </Container>
  );
};

export default ContainerList;

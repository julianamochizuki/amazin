import React from 'react';
import { Container } from 'react-bootstrap';
import Carrousel from '../../components/Home/Carrousel';
import ContainerList from '../../components/Home/Containers/ContainerList';
import DealsList from '../../components/Home/Deals/DealsList';

const Home = () => {
  return (
    <Container>
      <Carrousel />
      <ContainerList />
      <DealsList />
    </Container>
  );
};

export default Home;

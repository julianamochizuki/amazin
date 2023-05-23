import Cookies from 'js-cookie';
import React from 'react';
import { Container } from 'react-bootstrap';
import Carrousel from '../../components/Home/Carrousel';
import ContainerList from '../../components/Home/Containers/ContainerList';
import DealsList from '../../components/Home/Deals/DealsList';
import jwt_decode from 'jwt-decode';

const Home = () => {
  const handleTokenExpiration = () => {
    const token = Cookies.get('token');
    const decodedToken: { expiresAt?: string } | null = token
      ? jwt_decode(token)
      : null;
    const expiration = decodedToken?.expiresAt || null;

    if (token && expiration) {
      const expirationDate = new Date(expiration);
      if (expirationDate <= new Date()) {
        Cookies.remove('token');
      }
    }
  };

  handleTokenExpiration();

  return (
    <Container>
      <Carrousel />
      <ContainerList />
      <DealsList />
    </Container>
  );
};

export default Home;

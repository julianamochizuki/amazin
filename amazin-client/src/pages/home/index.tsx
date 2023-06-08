import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Carrousel from '../../components/Home/Carrousel';
import ContainerList from '../../components/Home/Containers/ContainerList';
import DealsList from '../../components/Home/Deals/DealsList';
import jwt_decode from 'jwt-decode';
import '../../styles/home.css';

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <Container className="home-section">
      {!isSmallScreen && <Carrousel />}
      <ContainerList />
      <DealsList />
    </Container>
  );
};

export default Home;

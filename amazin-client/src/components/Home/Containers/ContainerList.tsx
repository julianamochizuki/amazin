import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContainerType } from '../../../types/types';
import ContainerListItem from './ContainerListItem';

const ContainerList = function () {
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

  const containers: ContainerType[] = isSmallScreen
    ? [
        {
          title: 'Save on Electronics',
          image:
            'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
          path: '/departments/4/products',
        },
        {
          title: 'Gift Cards',
          image:
            'https://images.unsplash.com/photo-1620843437920-ead942b3abd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          path: '/departments/2/products',
        },

        {
          title: 'Home & Kitchen',
          image:
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          path: '/departments/5/products',
        },
      ]
    : [
        {
          title: "Today's Deals",
          image:
            'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
          path: '/deals',
        },
        {
          title: 'Save on Electronics',
          image:
            'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
          path: '/departments/4/products',
        },
        {
          title: 'Gift Cards',
          image:
            'https://images.unsplash.com/photo-1620843437920-ead942b3abd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          path: '/departments/2/products',
        },

        {
          title: 'Home & Kitchen',
          image:
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          path: '/departments/5/products',
        },
      ];

  const containerList = containers.map((c) => {
    return (
      <Col key={c.title} xs={12} sm={6} md={6} lg={3}>
        <ContainerListItem key={c.title} container={c} />
      </Col>
    );
  });

  return <Row className="container-section">{containerList}</Row>;
};

export default ContainerList;

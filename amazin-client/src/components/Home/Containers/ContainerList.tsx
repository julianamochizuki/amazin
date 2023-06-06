import React from 'react';
import { Row } from 'react-bootstrap';
import { ContainerType } from '../../../types/types';
import ContainerListItem from './ContainerListItem';

const ContainerList = function () {
  const containers: ContainerType[] = [
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
      path: '/departments/3/products',
    },
    {
      title: 'Gift Cards',
      image:
        'https://images.unsplash.com/photo-1620843437920-ead942b3abd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      path: '/departments/4/products',
    },

    {
      title: 'Home & Kitchen',
      image:
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      path: '/departments/2/products',
    },
  ];

  const containerList = containers.map((c) => {
    return <ContainerListItem key={c.title} container={c} />;
  });

  return <Row className="container-section">{containerList}</Row>;
};

export default ContainerList;

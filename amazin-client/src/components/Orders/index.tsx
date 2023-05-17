import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductType } from '../../types/types';
import OrderList from './OrderList';

type Props = {
  currentProduct: ProductType;
  setCurrentProduct: any;
};

export default function Orders(props: Props) {
  const { currentProduct, setCurrentProduct } = props;

  return (
    <Col>
      <Row>Your Orders</Row>
      <Row>
        <OrderList
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
        />
      </Row>
    </Col>
  );
}

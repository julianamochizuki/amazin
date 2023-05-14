import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import '../../styles/products.css';
import { ProductType } from '../../types/types';
import StarRating from '../Products/Rating';

type Props = {
  currentProduct: ProductType;
};

export default function ProductDetails(props: Props) {
  const { currentProduct } = props;

  return (
    <Col
      xs={12}
      sm={6}
      md={9}
      lg={9}
      key={currentProduct.id}
      className="product-details-container"
      spacing={1}
    >
      <Col>
        <Row className="product-title">{currentProduct.name}</Row>
        <Row>
          <Col xs={12} sm={6} md={5} lg={5}>
            <Image
              src={currentProduct.image}
              className="product-image"
              style={{ maxHeight: 200 }}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={7} className="product-details">
            <Row className="product-rating">
              <StarRating reviews={currentProduct.reviews} />
            </Row>
            <Row className="product-price">
              ${currentProduct.price_cents / 100}
            </Row>
            <Row className="about-item">About this item</Row>
            <Row className="product-description">
              {currentProduct.description}
            </Row>
          </Col>
        </Row>
      </Col>
    </Col>
  );
}

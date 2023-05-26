import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import '../../styles/products.css';
import StarRating from '../Products/Rating';

export default function ProductDetails() {
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );

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
              {currentProduct.reviews.length > 0 && (
                <StarRating reviews={currentProduct.reviews} />
              )}
            </Row>
            {currentProduct.isOnSale ? (
              <Col className="product-price">
                <Col className="product-sale-price">
                  $
                  {(
                    ((currentProduct!.price_cents / 100) *
                      (100 - currentProduct!.discountPercent! ?? 0)) /
                    100
                  ).toFixed(2)}
                </Col>
                <Col className="product-regular-price">
                  ${(currentProduct!.price_cents / 100).toFixed(2)}
                </Col>
                <Col className="product-sale-discount">
                  {currentProduct!.discountPercent}% off
                </Col>
              </Col>
            ) : (
              <Row className="product-price">
                ${(currentProduct!.price_cents / 100).toFixed(2)}
              </Row>
            )}
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

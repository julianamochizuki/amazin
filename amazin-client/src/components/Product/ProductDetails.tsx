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
      key={currentProduct.id}
      className="product-details-container"
      spacing={1}
    >
      <Col>
        <h5 className='product-title mb-3'>{currentProduct.name}</h5>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Image
              src={currentProduct.image}
              className="product-image"
              style={{ height: 300, width: 280 }}
            />
          </Col>
          <Col xs={12} sm={6} md={8} className="product-details pl-3">
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
              <Col className="product-price">
                ${(currentProduct!.price_cents / 100).toFixed(2)}
              </Col>
            )}
            <h6 className="about-item">About this item</h6>
            <Col className="product-text">
              {currentProduct.description}
            </Col>
          </Col>
        </Row>
      </Col>
    </Col>
  );
}

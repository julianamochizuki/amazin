import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import StarRating from './Rating';
import '../../styles/products.css';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../types/types';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../app/productReducer';

export default function ProductListItem(props: { product: ProductType }) {
  const { product } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      lg={3}
      key={product?.id}
      style={{ borderRadius: 3 }}
    >
      <Card className="card-container">
        <Card.Img
          variant="top"
          src={product?.image}
          className="card-image"
          style={{ height: 200 }}
        />
        <Card.Body className="card-body">
          {product.isOnSale ? (
            <Card.Text className="card-price">
              <Col className="card-sale-price">
                $
                {(
                  ((product!.price_cents / 100) *
                    (100 - product!.discountPercent! ?? 0)) /
                  100
                ).toFixed(2)}
              </Col>
              <Col className="card-regular-price">
                ${(product!.price_cents / 100).toFixed(2)}
              </Col>
              <Col className="card-sale-discount">
                {product!.discountPercent}% off
              </Col>
            </Card.Text>
          ) : (
            <Card.Text className="card-price">
              ${(product!.price_cents / 100).toFixed(2)}
            </Card.Text>
          )}
          <Card.Text key={product?.id} className="card-title">
            {product?.name}
          </Card.Text>
          {product!.reviews.length > 0 && (
            <StarRating reviews={product!.reviews} />
          )}
          <Button
            className="product-details-button"
            onClick={() => {
              dispatch(setCurrentProduct(product));
              navigate(`/products/${product?.id}`);
            }}
          >
            See product details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

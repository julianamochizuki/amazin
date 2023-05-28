import React from 'react';
import { Badge, Card, Col } from 'react-bootstrap';
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
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  
  return (
    <Col
      xs={12}
      sm={6}
      md={5}
      lg={3}
      key={product?.id}
      style={{ borderRadius: 3 }}
      className="d-flex justify-content-center"
    >
      <Card
        className="card-container pointer-cursor mt-3"
        onClick={() => {
          dispatch(setCurrentProduct(product));
          navigate(`/products/${product?.id}`);
        }}
      >
        {product.quantitySold !== undefined && product.quantitySold > 60 && (
          <Badge className="bestseller-badge">Bestseller</Badge>
        )}
        <Card.Img
          variant="top"
          src={product?.image}
          className="card-image"
          style={{ height: 230 }}
        />
        <Card.Body className="card-body">
          <Card.Text key={product?.id}>
            <span className="card-title">{product?.name}</span>
            {product!.reviews.length > 0 && (
              <StarRating reviews={product!.reviews} />
            )}
          </Card.Text>
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
              <Col>
                <span className="card-regular-price">
                  ${(product!.price_cents / 100).toFixed(2)}
                </span>
                <span className="card-sale-discount">
                  {product!.discountPercent}% off
                </span>
              </Col>
            </Card.Text>
          ) : (
            <Card.Text className="card-price">
              ${(product!.price_cents / 100).toFixed(2)}
            </Card.Text>
          )}
          <Card.Text className="card-delivery-date">
            FREE delivery{' '}
            <strong>
              {deliveryDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </strong>
          </Card.Text>

          {/* <Button
            className="product-details-button"
            onClick={() => {
              dispatch(setCurrentProduct(product));
              navigate(`/products/${product?.id}`);
            }}
          >
            See product details
          </Button> */}
        </Card.Body>
      </Card>
    </Col>
  );
}

import React from 'react';
import { Col, Dropdown, Image, Row } from 'react-bootstrap';
import { CartType, ProductType } from '../../types/types';

type Props = {
  cart: CartType;
  setCart: any;
  total: number;
};

export default function CheckoutList(props: Props) {
  const { cart, setCart } = props;

  return (
    <Col xs={12} className="cart-list">
      {cart.map((product: ProductType) => (
        <Row>
          <Col xs={12} sm={4} md={3} lg={3}>
            <Image
              className="product-image"
              src={product.image}
              alt={product.name}
            />
          </Col>
          <Col xs={12} sm={6} md={8} lg={8}>
            <Row>{product.name}</Row>
            <Row>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle>
                    Qty: {product.quantityInCart}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {Array.from(
                      { length: product.quantity },
                      (_, index) => index + 1
                    ).map((quantity: number) => (
                      <Dropdown.Item
                        onClick={() => {
                          product.quantityInCart = quantity;
                          localStorage.setItem('cart', JSON.stringify(cart));
                          setCart([...cart]);
                        }}
                      >
                        {quantity}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Col>

          {product.isOnSale ? (
            <Col xs={12} sm={1} md={1} lg={1}>
              $
              {(
                ((product!.price_cents / 100) *
                  (100 - product!.discountPercent! ?? 0)) /
                100
              ).toFixed(2)}
            </Col>
          ) : (
            <Col xs={12} sm={1} md={1} lg={1}>
              ${(product!.price_cents / 100).toFixed(2)}
            </Col>
          )}
        </Row>
      ))}
    </Col>
  );
}

import React from 'react';
import { Col, Dropdown, Image, Row } from 'react-bootstrap';
import { CartType, ProductType } from '../../types/types';

type Props = {
  cart: CartType;
  setCart: any;
  total: number;
};

export default function CartList(props: Props) {
  const { cart, setCart, total } = props;

  return (
    <Col xs={12} md={8} className="cart-list">
      <h3 className="cart-list-title">Shopping Cart</h3>
      {cart.map((product: ProductType) => (
        <Row className="cart-list-item">
          <Col
            xs={12}
            sm={6}
            md={3}
            lg={3}
            className="cart-product-image-container"
          >
            <Image
              className="cart-product-image"
              src={product.image}
              alt={product.name}
            />
          </Col>
          <Col>
            <h5 className="cart-product-name">{product.name}</h5>
            <Row>
              <Col xs={6} sm={4} md={3}>
                <Dropdown>
                  <Dropdown.Toggle className='cart-product-qty'>
                    Qty: {product.quantityInCart}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {Array.from(
                      { length: product.quantity },
                      (_, index) => index + 1
                    ).map((quantity: number) => (
                      <Dropdown.Item
                        key={quantity}
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
              <Col
              xs={6} sm={4} md={3}
              className='cart-product-delete pointer-cursor'
                onClick={() => {
                  const newCart = cart.filter(
                    (p: ProductType) => p.id !== product.id
                  );
                  localStorage.setItem('cart', JSON.stringify(newCart));
                  setCart(newCart);
                }}
              >
                Delete
              </Col>
            </Row>
          </Col>
          {product.isOnSale ? (
            <Col className="cart-product-price">
              $
              {(
                ((product!.price_cents / 100) *
                  (100 - product!.discountPercent! ?? 0)) /
                100
              ).toFixed(2)}
            </Col>
          ) : (
            <Col  xs={6} sm={4} md={3} lg={2}>
              ${(product!.price_cents / 100).toFixed(2)}
            </Col>
          )}
        </Row>
      ))}
      <Row className='cart-subtotal'>
        Subtotal ({cart.length} items): ${total}
      </Row>
    </Col>
  );
}

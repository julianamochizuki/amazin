import React from 'react';
import { Button, Col, Dropdown, Image, Row } from 'react-bootstrap';
import { CartType, ProductType } from '../../types/types';

type Props = {
  cart: CartType;
  setCart: any;
  total: number;
};

export default function CartList(props: Props) {
  const { cart, setCart, total } = props;

  return (
    <Col xs={12} md={10} className="cart-list">
      <Row className="cart-list-title">Shopping Cart</Row>
      {cart.map((product: ProductType) => (
        <Row>
          <Col xs={12} sm={6} md={3} lg={3}>
            <Image
              className="product-image"
              src={product.image}
              alt={product.name}
            />
          </Col>
          <Col>
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
              <Col>
                <Button
                  onClick={() => {
                    localStorage.setItem(
                      'cart',
                      JSON.stringify(
                        cart.filter((p: ProductType) => p.id !== product.id)
                      )
                    );
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>${product.price_cents / 100}</Col>
        </Row>
      ))}
      <Row>
        Subtotal ({cart.length} items): ${total / 100}
      </Row>
    </Col>
  );
}

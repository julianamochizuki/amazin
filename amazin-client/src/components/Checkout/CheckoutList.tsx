import React from 'react';
import { Col, Dropdown, Image, Row } from 'react-bootstrap';
import { RootState } from '../../app/store';
import { CartItem } from '../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../../app/cartReducer';

export default function CheckoutList() {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <Col xs={12} className="cart-list">
      {cart.map((product: CartItem) => (
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
                          const updatedProduct = {
                            ...product,
                            quantityInCart: quantity,
                          };
                          dispatch(updateCart(updatedProduct));
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

          <Col xs={12} sm={1} md={1} lg={1}>
            ${product.price_cents / 100}
          </Col>
        </Row>
      ))}
    </Col>
  );
}

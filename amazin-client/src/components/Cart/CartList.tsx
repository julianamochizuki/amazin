import React from 'react';
import { Button, Col, Dropdown, Image, Row } from 'react-bootstrap';
import { RootState } from '../../app/store';
import { CartItem } from '../../types/types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateCart, removeFromCart } from '../../app/cartReducer';

export default function CartList() {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();

  return (
    <Col xs={12} md={10} className="cart-list">
      <Row className="cart-list-title">Shopping Cart</Row>
      {cart.map((product: CartItem) => (
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
                        key={quantity}
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
              <Col>
                <Button
                  onClick={() => {
                    dispatch(removeFromCart(product.id))
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

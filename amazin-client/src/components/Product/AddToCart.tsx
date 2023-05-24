import React, { useState } from 'react';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { ProductType } from '../../types/types';
import { useDispatch } from 'react-redux';
import { addToCart, updateCart } from '../../app/cartReducer';

type Props = {
  vendor: string;
};

type Options = {
  weekday: 'long';
  month: 'long';
  day: 'numeric';
};

export default function AddToCart(props: Props) {
  const { vendor } = props;
  const [quantitySelected, setQuantitySelected] = useState(1);
  const navigate = useNavigate();
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const options: Options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDeliveryDate = deliveryDate.toLocaleDateString(
    'en-US',
    options
  );

  const handleAddToCart = () => {
    if (cart) {
      const productInCart = cart.find(
        (product: ProductType) => product.id === currentProduct.id
      );
      if (productInCart) {
        const updatedProduct = {
          ...productInCart,
          quantityInCart: productInCart.quantityInCart + quantitySelected,
        };
        dispatch(updateCart(updatedProduct));
      } else {
        const newProduct = {
          ...currentProduct,
          quantityInCart: quantitySelected,
        };
        dispatch(addToCart(newProduct));
      }
    } else {
      const newProduct = {
        ...currentProduct,
        quantityInCart: quantitySelected,
      };
      dispatch(addToCart(newProduct));
    }
    navigate('/cart');
  };
  return (
    <Col xs={12} sm={6} md={3} lg={3} className="add-to-cart-container">
      <Row>${currentProduct.price_cents / 100}</Row>
      <Row>FREE delivery {formattedDeliveryDate}</Row>
      <Row>
        {currentProduct.quantity ? <p> In Stock </p> : <p> Out of Stock </p>}
      </Row>
      <Row>
        <Dropdown>
          <Dropdown.Toggle>
            Qty: {quantitySelected ? quantitySelected : 1}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Array.from(
              { length: currentProduct.quantity },
              (_, index) => index + 1
            ).map((quantity: number) => (
              <Dropdown.Item
                key={quantity}
                onClick={() => {
                  setQuantitySelected(quantity);
                }}
              >
                {quantity}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button className="call-to-action-button" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </Row>
      <Row>Sold by {vendor}</Row>
    </Col>
  );
}

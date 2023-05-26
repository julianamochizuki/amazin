import React, { useState } from 'react';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentProduct } from '../../app/productReducer';
import { RootState } from '../../app/store';
import { ProductType } from '../../types/types';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const options: Options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDeliveryDate = deliveryDate.toLocaleDateString(
    'en-US',
    options
  );

  const handleAddToCart = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartArray = JSON.parse(cart);
      const productInCart = cartArray.find(
        (product: ProductType) => product.id === currentProduct.id
      );
      if (productInCart) {
        productInCart.quantityInCart += quantitySelected;
      } else {
        const udpatedCurrentProduct = { ...currentProduct };
        udpatedCurrentProduct.quantityInCart = quantitySelected;
        dispatch(setCurrentProduct({ ...udpatedCurrentProduct }));
        cartArray.push(udpatedCurrentProduct);
      }
      localStorage.setItem('cart', JSON.stringify(cartArray));
    } else {
      const updatedCurrentProduct = { ...currentProduct };
      updatedCurrentProduct.quantityInCart = quantitySelected;
      dispatch(setCurrentProduct({ ...updatedCurrentProduct }));
      localStorage.setItem('cart', JSON.stringify([updatedCurrentProduct]));
    }
    navigate('/cart');
  };

  return (
    <Col xs={12} sm={6} md={3} lg={3} className="add-to-cart-container">
      {currentProduct.isOnSale ? (
        <Row>
          $
          {(
            ((currentProduct!.price_cents / 100) *
              (100 - currentProduct!.discountPercent! ?? 0)) /
            100
          ).toFixed(2)}
        </Row>
      ) : (
        <Row>${(currentProduct!.price_cents / 100).toFixed(2)}</Row>
      )}
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

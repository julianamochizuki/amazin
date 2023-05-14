import React from 'react';
import { ProductType } from '../../types/types';

type Props = {
  currentProduct: ProductType;
};

export default function AddToCart(props: Props) {
  const { currentProduct } = props;

  return (
    <>
      <h4>${currentProduct.price_cents / 100}</h4>
      <p>FREE delivery Friday, May 26.</p>
      <p>In Stock</p>
    </>
  );
}

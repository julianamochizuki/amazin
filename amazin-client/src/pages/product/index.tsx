import React from 'react';
import AddToCart from '../../components/Product/AddToCart';
import ProductDetails from '../../components/Product/ProductDetails';
import { ProductType } from '../../types/types';

type Props = {
  currentProduct: ProductType;
};

const Product = (props: Props) => {
  const { currentProduct } = props;

  return (
    <>
      <ProductDetails currentProduct={currentProduct} />
      <AddToCart currentProduct={currentProduct} />
    </>
  );
};

export default Product;

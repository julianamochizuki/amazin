import React from 'react';
import ProductList from '../../components/Products/ProductList';
import { ProductType } from '../../types/types';

type Props = {
  currentProduct: ProductType;
  setCurrentProduct: any;
};

const Products = (props: Props) => {
  const { currentProduct, setCurrentProduct } = props;

  return (
    <ProductList
      currentProduct={currentProduct}
      setCurrentProduct={setCurrentProduct}
    />
  );
};

export default Products;

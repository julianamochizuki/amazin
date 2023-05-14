import React from 'react';
import ProductList from '../../components/Products/ProductList';
import { CategoryType, ProductType } from '../../types/types';

type Props = {
  currentCategory: CategoryType;
  currentProduct: ProductType;
  setCurrentProduct: any;
};

const Products = (props: Props) => {
  const { currentCategory, currentProduct, setCurrentProduct } = props;

  return (
    <ProductList
      currentCategory={currentCategory}
      currentProduct={currentProduct}
      setCurrentProduct={setCurrentProduct}
    />
  );
};

export default Products;

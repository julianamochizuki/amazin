import React from 'react';
import ProductList from '../../components/Products/ProductList';

type Props = {
  currentCategory: {
    id: number;
    name: string;
    products: any[];
  };
  currentProduct: {
    id: number;
    name: string;
    image: string;
    price_cents: number;
    reviews: any[];
  };
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

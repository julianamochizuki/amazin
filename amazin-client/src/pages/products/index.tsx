import React from 'react';
import ProductList from '../../components/Products/ProductList';

type Props = {
  currentCategory: {
    id: number;
    name: string;
    products: any[];
  };
};

const Products = (props: Props) => {
  const { currentCategory } = props;

  return <ProductList currentCategory={currentCategory} />;
};

export default Products;

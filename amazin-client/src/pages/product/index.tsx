import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../../components/Products/Product';

type Props = {
  currentProduct: {
    id: number;
    name: string;
    image: string;
    price_cents: number;
    reviews: any[];
  };
};

const Product = (props: Props) => {
  const { currentProduct } = props;

  return <ProductDetails currentProduct={currentProduct} />;
};

export default Product;

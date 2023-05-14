import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { CategoryType, ProductType } from '../../types/types';
import ProductListItem from './ProductListItem';

type Props = {
  currentCategory: CategoryType;
  currentProduct: ProductType;
  setCurrentProduct: any;
};

export default function ProductList(props: Props) {
  const [products, setProducts] = useState([]);
  const { currentCategory, setCurrentProduct } = props;
  const url = process.env.REACT_APP_API_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${url}/api/categories/${currentCategory.id}/products`)
      .then((res) => {
        console.log('res.data', res.data);
        setProducts(res.data);
      });
  }, [currentCategory]);

  console.log('products', products);

  const productLists = products.map((p: ProductType) => {
    return (
      <ProductListItem
        key={p.id}
        product={p}
        // id={p.id}
        // name={p.name}
        // image={p.image}
        // price_cents={p.price_cents}
        // reviews={p.reviews}
        setCurrentProduct={setCurrentProduct}
      />
    );
  });

  return <Row>{productLists}</Row>;
}

import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
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
  const { categoryId } = useParams();

  useEffect(() => {
    axios
      .get(`${url}/api/categories/${categoryId}/products`)
      .then((res) => {
        setProducts(res.data);
      });
  }, [currentCategory.id]);

  const productLists = products.map((p: ProductType) => {
    return (
      <ProductListItem
        key={p.id}
        product={p}
        setCurrentProduct={setCurrentProduct}
      />
    );
  });

  return <Row>{productLists}</Row>;
}

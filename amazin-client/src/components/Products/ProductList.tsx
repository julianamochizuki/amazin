import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ProductType } from '../../types/types';
import Error from './Error';
import ProductListItem from './ProductListItem';

type Props = {
  currentProduct: ProductType;
  setCurrentProduct: any;
};

export default function ProductList(props: Props) {
  const [products, setProducts] = useState([]);
  const { setCurrentProduct } = props;
  const url = process.env.REACT_APP_API_SERVER_URL;
  const { categoryId, searchTerm } = useParams();
  console.log('searchTerm', searchTerm);
  console.log('categoryId', categoryId);

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`${url}/api/categories/${categoryId}/products`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => {
          console.log('error fetching products based on category', e);
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/search?s=${searchTerm}`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => {
          console.log('error fetching products based on search term', e);
        });
    }
  }, [categoryId, searchTerm]);

  const productLists = products.map((p: ProductType) => {
    return (
      <ProductListItem
        key={p.id}
        product={p}
        setCurrentProduct={setCurrentProduct}
      />
    );
  });

  return <Row>{products.length ? productLists : <Error />}</Row>;
}

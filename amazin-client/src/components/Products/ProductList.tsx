import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ProductType } from '../../types/types';
import Error from './Error';
import ProductFilter from './ProductFilter';
import ProductListItem from './ProductListItem';

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState('');
  const { categoryId, searchTerm, rating, minPrice, maxPrice } = useParams();
  const categoryIdValue = categoryId !== undefined ? categoryId : null;
  const searchTermValue = searchTerm !== undefined ? searchTerm : null;

  useEffect(() => {
    if (searchTermValue && rating && minPrice && maxPrice) {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/search?s=${searchTerm}&rating=${rating}&min=${minPrice}&max=${maxPrice}`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => {
          console.log('error fetching products based on search term', e);
        });
    } else if (categoryIdValue && rating && minPrice && maxPrice) {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER_URL}/api/categories/${categoryId}/products/filter?rating=${rating}&min=${minPrice}&max=${maxPrice}`
        )
        .then((res) => {
          setCurrentCategoryId(categoryIdValue!);
          setProducts(res.data);
        })
        .catch((e) => {
          console.log('error fetching products based on filter', e);
        });
    }
  }, [categoryIdValue, searchTermValue, rating, minPrice, maxPrice]);

  console.log(currentCategoryId, 'currentCategoryId');

  const productLists = products.map((p) => {
    return (
      <ProductListItem
        key={p.id}
        product={p}
      />
    );
  });

  return (
    <Row>
      {products.length ? (
        <>
          <Col xs={2}>
            <ProductFilter currentCategoryId={currentCategoryId} />
          </Col>
          <Col xs={10}>
            <Row>{productLists}</Row>
          </Col>
        </>
      ) : (
        <Error />
      )}
    </Row>
  );
}

import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { ProductType } from '../../types/types';
import ProductFilter from './ProductFilter';
import ProductListItem from './ProductListItem';
import { useSelector } from 'react-redux';
import NoProductsFound from './NoProductsFound';

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState('');
  const { categoryId, searchTerm } = useParams();
  const productFilter = useSelector(
    (state: RootState) => state.productFilters.currentProductFilter
  );
  const categoryIdValue = categoryId !== undefined ? categoryId : null;
  const searchTermValue = searchTerm !== undefined || '' ? searchTerm : null;
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    if (categoryIdValue) {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER_URL}/api/categories/${categoryId}/products/filter?rating=${productFilter.rating}&min=${productFilter.minPrice}&max=${productFilter.maxPrice}`
        )
        .then((res) => {
          setCurrentCategoryId(categoryIdValue!);
          setProducts(res.data);
        })
        .catch((e) => {
          console.log('error fetching products based on filter', e);
        });
    }

    if (searchTermValue) {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/search?s=${searchTerm}&rating=${productFilter.rating}&min=${productFilter.minPrice}&max=${productFilter.maxPrice}`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => {
          console.log('error fetching products based on search term', e);
        });
    }

    if (location.pathname === '/deals') {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/deals?rating=${productFilter.rating}&min=${productFilter.minPrice}&max=${productFilter.maxPrice}`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => {
          console.log('error fetching products based on search term', e);
        });
    }
  }, [categoryIdValue, searchTermValue, productFilter, location.pathname]);

  // useEffect(() => {
  //   if (location.pathname === '/deals') {
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_API_SERVER_URL}/api/products/deals?rating=${productFilter.rating}&min=${productFilter.minPrice}&max=${productFilter.maxPrice}`
  //       )
  //       .then((res) => {
  //         setProducts(res.data);
  //       })
  //       .catch((e) => {
  //         console.log('error fetching products based on deals', e);
  //       });
  //   }
  // }, [path]);

  const productLists = products.map((p) => {
    return <ProductListItem key={p.id} product={p} />;
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
        <NoProductsFound />
      )}
    </Row>
  );
}

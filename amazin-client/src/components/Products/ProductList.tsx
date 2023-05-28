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
import '../../styles/products.css';

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { categoryId, departmentId, searchTerm } = useParams();
  const productFilter = useSelector(
    (state: RootState) => state.productFilters.currentProductFilter
  );
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/categories')) {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER_URL}/api/categories/${categoryId}/products/filter?rating=${productFilter.rating}&min=${productFilter.minPrice}&max=${productFilter.maxPrice}`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => {
          console.log('error fetching products based on category', e);
        });
    }

    if (location.pathname.includes('/search')) {
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

    if (location.pathname.includes('/departments')) {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER_URL}/api/departments/${departmentId}/products?rating=${productFilter.rating}&min=${productFilter.minPrice}&max=${productFilter.maxPrice}`
        )
        .then((res) => {
          setProducts(res.data);

          console.log('products', res.data);
        })
        .catch((e) => {
          console.log('error fetching products based on department', e);
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
          console.log('error fetching deals', e);
        });
    }

    if (location.pathname === '/bestsellers') {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/bestsellers?rating=${productFilter.rating}&min=${productFilter.minPrice}&max=${productFilter.maxPrice}`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => {
          console.log('error fetching best sellers', e);
        });
    }
  }, [categoryId, searchTerm, departmentId, productFilter, location.pathname]);

  const productLists = products.map((p) => {
    return <ProductListItem key={p.id} product={p} />;
  });

  return (
    <Row className="px-5 d-flex justify-content-center">
      {products.length ? (
        <>
          <Col xs={12} md={2} className='mt-5'>
            <ProductFilter />
          </Col>
          <Col xs={12} md={9}>
            <h3>Results</h3>
            <Row>{productLists}</Row>
          </Col>
        </>
      ) : (
        <NoProductsFound />
      )}
    </Row>
  );
}

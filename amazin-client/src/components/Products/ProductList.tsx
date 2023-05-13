import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import ProductListItem from './ProductListItem';

type Props = {
  currentCategory: {
    id: number;
    name: string;
    products: any[];
  };
};

interface Product {
  id: number;
  name: string;
  image: string;
  price_cents: number;
  reviews: any[];
}

export default function ProductList(props: Props) {
  const [products, setProducts] = useState([]);
  const { currentCategory } = props;

  useEffect(() => {
    axios.get(`api/categories/${currentCategory.id}/products`).then((res) => {
      console.log('res.data', res.data);
      setProducts(res.data);
    });
  }, [currentCategory]);

  console.log('products', products);

  const productLists = products.map((p: Product) => {
    return (
      <ProductListItem
        key={p.id}
        id={p.id}
        name={p.name}
        image={p.image}
        price_cents={p.price_cents}
        reviews={p.reviews}
      />
    );
  });

  return <Row>{productLists}</Row>;
}

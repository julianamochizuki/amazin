import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import AddToCart from '../../components/Product/AddToCart';
import ProductDetails from '../../components/Product/ProductDetails';
import { ProductType } from '../../types/types';
import '../../styles/product.css';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

type Props = {
  currentProduct: ProductType;
  setCurrentProduct: any;
};

const Product = (props: Props) => {
  const { currentProduct, setCurrentProduct } = props;
  const { cardId } = useParams();
  const [vendor, setVendor] = useState({} as any);
  const url = process.env.REACT_APP_API_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(`${url}/api/products/${cardId}`);
        setCurrentProduct(productRes.data);
        const userRes = await axios.get(
          `${url}/api/users/${productRes.data.userId}`
        );
        setVendor(userRes.data);
      } catch (e) {
        console.error('Error fetching product details', e);
      }
    };

    fetchData();
  }, []);

  return (
    <Row className="product-container">
      <ProductDetails currentProduct={currentProduct} />
      <AddToCart currentProduct={currentProduct} vendor={vendor} />
    </Row>
  );
};

export default Product;

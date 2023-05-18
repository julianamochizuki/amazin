import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import AddToCart from '../../components/Product/AddToCart';
import ProductDetails from '../../components/Product/ProductDetails';
import { ProductType } from '../../types/types';
import '../../styles/product.css';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductReviews from '../../components/ProductReviews';

type Props = {
  currentProduct: ProductType;
  setCurrentProduct: any;
};

const Product = (props: Props) => {
  const { currentProduct, setCurrentProduct } = props;
  const { productId } = useParams();
  const [vendor, setVendor] = useState('');
  const url = process.env.REACT_APP_API_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/api/products/${productId}`);
        setCurrentProduct(res.data);
        setVendor(res.data.User.name);
      } catch (e) {
        console.error('Error fetching product details', e);
      }
    };
    fetchData();
  }, []);

  return (
    <Col>
      <Row className="product-container">
        <ProductDetails currentProduct={currentProduct} />
        <AddToCart currentProduct={currentProduct} vendor={vendor} />
      </Row>
      {currentProduct.reviews?.length > 0 && (
        <ProductReviews currentProduct={currentProduct} />
      )}
    </Col>
  );
};

export default Product;

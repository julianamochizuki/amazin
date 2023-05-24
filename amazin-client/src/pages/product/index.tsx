import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import AddToCart from '../../components/Product/AddToCart';
import ProductDetails from '../../components/Product/ProductDetails';
import '../../styles/product.css';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductReviews from '../../components/ProductReviews';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentProduct } from '../../app/productReducer';

const Product = () => {
  const dispatch = useDispatch();
  const [reviewsEdited, setReviewsEdited] = useState(false);
  const { productId } = useParams();
  const [vendor, setVendor] = useState('');
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );
  const url = process.env.REACT_APP_API_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/api/products/${productId}`);
        dispatch(setCurrentProduct(res.data));
        setVendor(res.data.User.name);
      } catch (e) {
        console.error('Error fetching product details', e);
      }
    };
    fetchData();
  }, [currentProduct?.reviews.length, reviewsEdited]);

  return (
    <Col>
      <Row className="product-container">
        <ProductDetails />
        <AddToCart vendor={vendor} />
      </Row>
      {currentProduct!.reviews?.length > 0 && (
        <ProductReviews setReviewsEdited={setReviewsEdited} />
      )}
    </Col>
  );
};

export default Product;

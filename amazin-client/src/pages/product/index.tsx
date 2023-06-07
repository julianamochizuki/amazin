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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}`);
        dispatch(setCurrentProduct(res.data));
        setVendor(res.data.User.name);
      } catch (e) {
        console.error('Error fetching product details', e);
      }
    };
    fetchData();
  }, [currentProduct?.reviews.length, reviewsEdited]);

  return (
    <Col className="product-container mx-3 p-4">
      <Row className="product-details">
        <ProductDetails />
        <AddToCart vendor={vendor} />
      </Row>
      <Row className="product-reviews">
        {currentProduct!.reviews?.length > 0 && (
          <ProductReviews setReviewsEdited={setReviewsEdited} />
        )}
      </Row>
    </Col>
  );
};

export default Product;

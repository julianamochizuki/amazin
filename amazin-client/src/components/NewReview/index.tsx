import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Image, Alert } from 'react-bootstrap';
import { StarFill, Star, CheckCircleFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../app/productReducer';
import { ReviewType } from '../../types/types';
import { Link } from 'react-router-dom';

const WriteReview = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userId = currentUser.id;
  const dispatch = useDispatch();
  const { productId } = useParams();
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );

  useEffect(() => {
    axios
      .get(`/api/products/${productId}`)
      .then((res) => {
        dispatch(setCurrentProduct(res.data));
      })
      .catch((e) => {
        console.log('error fetching reviews', e);
      });
  }, []);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
    if (ratingError) {
      setRatingError(false);
    }
  };

  const userHasReviewed = currentProduct.reviews.find((review) => {
    if (review!.userId === userId) {
      return true;
    }
    return false;
  });

  const userReview = currentProduct.reviews.find(
    (review) => review!.userId === userId
  );

  useEffect(() => {
    if (userHasReviewed) {
      setDescription(userReview?.description || '');
      setRating(userReview?.rating || 0);
    }
  }, [currentProduct]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let hasError = false;
    if (rating === 0) {
      setRatingError(true);
      hasError = true;
    }
    if (description.length < 1) {
      setDescriptionError(true);
      hasError = true;
    }
    if (hasError) {
      return;
    }

    if (!userHasReviewed) {
      await axios
        .post(
          `/api/products/${currentProduct.id}/reviews`,
          {
            rating,
            description,
            productId: currentProduct.id,
            userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setShowAlert(true);
          dispatch(
            setCurrentProduct({
              ...currentProduct,
              reviews: currentProduct.reviews.map((review: ReviewType) =>
                review!.id === res.data.id ? res.data : review
              ),
            })
          );
        })
        .catch((e) => {
          console.log('error creating review', e);
        });
    } else {
      axios
        .patch(
          `/api/products/${currentProduct.id}/reviews/${userReview!.id}`,
          {
            description,
            rating,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setShowAlert(true);
          dispatch(
            setCurrentProduct({
              ...currentProduct,
              reviews: currentProduct.reviews.map((review: ReviewType) =>
                review!.id === res.data.id ? res.data : review
              ),
            })
          );
        })
        .catch((e) => {
          console.log('error editing review', e);
        });
    }
  };

  return (
    <Col className="new-review-section">
      <h4 className="mb-3">Create Review</h4>
      <Col className="mb-3 pb-3 new-review-product">
        <Image
          src={currentProduct.image}
          className="new-review-product-image"
          style={{ width: '50px', height: '50px' }}
        />
        {currentProduct.name}
      </Col>
      <h6 className="overall-rating">Overall rating</h6>
      <Col
        style={{ color: '#FFA41C' }}
        className="mb-3 pb-3 overall-rating-stars"
      >
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              onClick={() => handleStarClick(index)}
              style={{ cursor: 'pointer' }}
            >
              {rating >= starValue ? <StarFill /> : <Star />}
            </span>
          );
        })}
        <Col>
          {rating === 0 && ratingError && (
            <Form.Text className="text-danger">
              Please select a rating
            </Form.Text>
          )}
        </Col>
      </Col>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3 pb-3 review-form"
          controlId="reviewDescription"
        >
          <Form.Label className="h6">
            {userHasReviewed ? 'Edit review' : 'Add a written review'}
          </Form.Label>
          <Form.Control
            isInvalid={descriptionError}
            as="textarea"
            minLength={1}
            placeholder="What did you like or dislike? What did you use this product for?"
            value={description}
            rows={3}
            onChange={(e) => {
              setDescription(e.target.value);
              if (descriptionError) {
                setDescriptionError(false);
              }
            }}
          />
          <Col>
            {description.length < 1 && descriptionError && (
              <Form.Text className="text-danger">
                Please add a written review
              </Form.Text>
            )}
          </Col>
        </Form.Group>
        <Button
          variant="warning"
          type="submit"
          className="submit-review-button"
        >
          Submit
        </Button>
        {showAlert && (
          <Alert variant="success" className="p-2 mt-1">
            <CheckCircleFill /> Review submitted - Thank you!{' '}
            <Link to={`/products/${currentProduct.id}`}>View product</Link>
          </Alert>
        )}
      </Form>
    </Col>
  );
};

export default WriteReview;

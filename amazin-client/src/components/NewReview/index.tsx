import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import { StarFill, Star } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const WriteReview = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_SERVER_URL;
  const token = Cookies.get('token') || null;
  const decodedToken: { id?: Number } | null = token ? jwt_decode(token) : null;
  const userId = decodedToken?.id || null;
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
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
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userHasReviewed) {
      await axios.post(
        `${url}/api/products/${currentProduct.id}/reviews`,
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
      );
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/${currentProduct.id}/reviews/${userReview!.id}`,
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
          userReview!.description = res.data.description;
          userReview!.rating = res.data.rating;
        })
        .catch((e) => {
          console.log('error editing review', e);
        });
    }
    navigate(`/add-a-review/thank-you`);
  };

  return (
    <>
      <Row>Create Review</Row>
      <Row>Overall rating</Row>
      <Col style={{ color: '#FFA41C' }}>
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
      </Col>
      <Form>
        <Form.Group>
          <Form.Label>
            {userHasReviewed ? 'Edit review' : 'Add a written review'}
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder="What did you like or dislike? What did you use this product for?"
            value={description}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="warning" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default WriteReview;

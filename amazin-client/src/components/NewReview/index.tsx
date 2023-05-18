import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import { StarFill, Star } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../types/types';
import jwt_decode from 'jwt-decode';

type Props = {
  currentProduct: ProductType;
};

const WriteReview = (props: Props) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const { currentProduct } = props;
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_SERVER_URL;
  const token = Cookies.get('token') || null;
  const decodedToken: { id?: Number } | null = token ? jwt_decode(token) : null;
  const userId = decodedToken?.id || null;

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

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
          <Form.Label>Add a written review</Form.Label>
          <Form.Control
            as="textarea"
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

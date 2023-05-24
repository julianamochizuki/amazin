import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import { ReviewType } from '../../types/types';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

type Props = {
  review: ReviewType;
  setReviewsEdited: any;
};

export default function ReviewListItem(props: Props) {
  const { review, setReviewsEdited } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(review!.description);
  const [rating, setRating] = useState(review!.rating);
  const MAX_RATING = 5;
  const token = Cookies.get('token') || null;
  const decodedToken: { id?: Number } | null = token ? jwt_decode(token) : null;
  const userId = decodedToken?.id || null;
  const navigate = useNavigate();
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );

  const solidStars = Array.from({ length: review!.rating }, (_, index) => (
    <StarFill key={`solid-star-${index}`} />
  ));

  const regularStars = Array.from(
    { length: MAX_RATING - review!.rating },
    (_, index) => <Star key={`regular-star-${index}`} />
  );

  const handleClick = () => {
    if (isEditing) {
      setIsEditing(false);
      setDescription(review!.description);
      setRating(review!.rating);
    } else {
      axios
        .delete(
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/${currentProduct.id}/reviews/${review!.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setReviewsEdited((prev: boolean) => !prev);
          navigate(`/products/${currentProduct.id}`);
        })
        .catch((e) => {
          console.log('error deleting review', e);
        });
    }
  };

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/${currentProduct.id}/reviews/${review!.id}`,
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
          review!.description = res.data.description;
          review!.rating = res.data.rating;
          setIsEditing(false);
          setReviewsEdited((prev: boolean) => !prev);
        })
        .catch((e) => {
          console.log('error editing review', e);
        });
    }
  };

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  return (
    <Col>
      <Row>{review!.user.name}</Row>
      {isEditing ? (
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
      ) : (
        <Col style={{ color: '#FFA41C' }}>
          {solidStars}
          {regularStars}
        </Col>
      )}
      <Row>Reviewed on {review!.createdAt}</Row>
      {isEditing ? (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <Row>{review!.description}</Row>
      )}
      {userId === review!.user.id && (
        <Button variant="warning" onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      )}
      {userId === review!.user.id && (
        <Button variant="warning" onClick={handleClick}>
          {isEditing ? 'Cancel' : 'Delete'}
        </Button>
      )}
    </Col>
  );
}

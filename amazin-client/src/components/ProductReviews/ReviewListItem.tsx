import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import { ReviewType } from '../../types/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../app/productReducer';

type Props = {
  review: ReviewType;
  setReviewsEdited: any;
};

export default function ReviewListItem(props: Props) {
  const { review, setReviewsEdited } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);
  const [description, setDescription] = useState(review!.description);
  const [rating, setRating] = useState(review!.rating);
  const MAX_RATING = 5;
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userId = currentUser.id;
  const navigate = useNavigate();
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );
  const date = new Date(review!.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const dispatch = useDispatch();

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
      setError(false);
      setDescription(review!.description);
      setRating(review!.rating);
    } else {
      axios
        .delete(`/api/products/${currentProduct.id}/reviews/${review!.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setReviewsEdited((prev: boolean) => !prev);
          navigate(`/products/${currentProduct.id}`);
        })
        .catch((e) => {
          console.log('error deleting review', e);
        });
    }
  };

  const handleSubmit = () => {
    if (isEditing) {
      if (description.length < 1) {
        setError(true);
        return;
      }
      axios
        .patch(
          `/api/products/${currentProduct.id}/reviews/${review!.id}`,
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
          setReviewsEdited((prev: boolean) => !prev);
          setIsEditing(false);
          setError(false);
          dispatch(
            setCurrentProduct({
              ...currentProduct,
              reviews: currentProduct.reviews.map((r) =>
                r?.id === review?.id ? review : r
              ),
            })
          );
        })
        .catch((e) => {
          console.log('error editing review', e);
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  return (
    <Col className="review-container">
      <Col className="product-text">{review?.user?.name}</Col>
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
      <Col className="review-date product-text">
        Reviewed in Canada on {formattedDate}
      </Col>
      <Col className="verified-purchase">Verified Purchase</Col>
      {isEditing ? (
        <Form.Control
          isInvalid={error}
          as="textarea"
          required
          minLength={1}
          className="product-text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError(false);
          }}
        />
      ) : (
        <Col className="product-text">{review!.description}</Col>
      )}
      {error && (
        <span
          className="text-danger d-block mt-2"
          style={{ fontSize: '0.8rem' }}
        >
          Please add a written review
        </span>
      )}
      {userId === review?.user?.id && (
        <Button
          variant="light"
          className="edit-review-button"
          type="button"
          onClick={handleSubmit}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      )}
      {userId === review?.user?.id && (
        <Button
          variant="light"
          className="delete-review-button"
          type="button"
          onClick={handleClick}
        >
          {isEditing ? 'Cancel' : 'Delete'}
        </Button>
      )}
    </Col>
  );
}

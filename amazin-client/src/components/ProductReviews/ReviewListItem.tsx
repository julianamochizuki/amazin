import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
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
  const date = new Date(review!.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/${
            currentProduct.id
          }/reviews/${review!.id}`,
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
          `${process.env.REACT_APP_API_SERVER_URL}/api/products/${
            currentProduct.id
          }/reviews/${review!.id}`,
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
        <textarea
          className="product-text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <Col className="product-text">{review!.description}</Col>
      )}
      {userId === review?.user?.id && (
        <Button variant="light" className='edit-review-button' onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      )}
      {userId === review?.user?.id && (
        <Button variant="light" className='delete-review-button' onClick={handleClick}>
          {isEditing ? 'Cancel' : 'Delete'}
        </Button>
      )}
    </Col>
  );
}

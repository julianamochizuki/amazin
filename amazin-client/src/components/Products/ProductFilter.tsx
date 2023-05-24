import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

interface ProductFilterType {
  rating: number;
  minPrice: number | null;
  maxPrice: number | null;
}

type Props = {
  currentCategoryId: string;
};

export default function ProductFilter(props: Props) {
  const { currentCategoryId } = props;
  const navigate = useNavigate();
  const [productFilter, setProductFilter] = useState<ProductFilterType>({
    rating: 0,
    minPrice: 0,
    maxPrice: 1000000,
  });
  const priceRanges: { min: number | null; max: number | null }[] = [
    { min: 0, max: 25 },
    { min: 25, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: 0 },
  ];

  const starsReview = (rating: number) => {
    const solidStars = Array.from({ length: rating }, (_, index) => (
      <StarFill key={`solid-star-${index}`} style={{ color: '#FFA41C' }} />
    ));

    const regularStars = Array.from({ length: 5 - rating }, (_, index) => (
      <Star key={`regular-star-${index}`} style={{ color: '#FFA41C' }} />
    ));

    return [...solidStars, ...regularStars];
  };

  useEffect(() => {
    if (currentCategoryId) {
    navigate(
      `/categories/${currentCategoryId}/products/${productFilter.rating}/${productFilter.minPrice}/${productFilter.maxPrice}`
    );
    }
    // } else {
    //   navigate(`/products/search/${searchTerm}/${productFilter.rating}/${productFilter.minPrice}/${productFilter.maxPrice}`);
  }, [productFilter]);

  return (
    <Col>
      <Row>Customer Review</Row>
      {[4, 3, 2, 1].map((rating) => (
        <Col
          key={rating}
          className="pointer-cursor"
          onClick={() => {
            setProductFilter({ ...productFilter, rating });
          }}
        >
          {starsReview(rating)} & Up
        </Col>
      ))}
      <Row>Price</Row>
      {priceRanges.map((range) => (
        <Col
          key={range.min}
          className="pointer-cursor"
          onClick={() => {
            setProductFilter({
              ...productFilter,
              minPrice: range.min! * 100,
              maxPrice: range.max! * 100,
            });
          }}
        >
          {range.min ? `$${range.min}` : 'Under'}
          {range.min && range.max ? ' to ' : ' '}
          {range.max ? `$${range.max}` : '& above'}
        </Col>
      ))}
    </Col>
  );
}

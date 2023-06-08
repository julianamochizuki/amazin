import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ChevronLeft, Star, StarFill } from 'react-bootstrap-icons';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProductFilter } from '../../app/productFilterReducer';

export default function ProductFilter() {
  const productFilter = useSelector(
    (state: RootState) => state.productFilters.currentProductFilter
  );
  const dispatch = useDispatch();

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

  return (
    <Row>
      <Col xs={7} md={12} className="product-filter-review">
        <p className="filter-title">Avg. Customer Review</p>
        <Col
          className="pointer-cursor"
          onClick={() => {
            dispatch(
              setCurrentProductFilter({
                ...productFilter,
                rating: 0,
              })
            );
          }}
        >
          <p className="filter-text">
            <ChevronLeft /> Clear
          </p>
        </Col>
        {[4, 3, 2, 1].map((rating) => (
          <Col
            key={rating}
            className="pointer-cursor filter-text"
            onClick={() => {
              dispatch(
                setCurrentProductFilter({
                  ...productFilter,
                  rating,
                })
              );
            }}
          >
            {starsReview(rating)} & Up
          </Col>
        ))}
      </Col>
      <Col xs={5} md={12} className="product-filter-review">
        <p className="filter-title">Price</p>
        <Row
          className="pointer-cursor filter-text"
          onClick={() => {
            dispatch(
              setCurrentProductFilter({
                ...productFilter,
                minPrice: 0,
                maxPrice: 10000000,
              })
            );
          }}
        >
          <p>
            <ChevronLeft /> Clear
          </p>
        </Row>
        {priceRanges.map((range) => (
          <Col
            key={range.min}
            className="pointer-cursor filter-text"
            onClick={() => {
              dispatch(
                setCurrentProductFilter({
                  ...productFilter,
                  minPrice: range.min! * 100,
                  maxPrice: range.max === 0 ? 10000000 : range.max! * 100,
                })
              );
            }}
          >
            {range.min ? `$${range.min}` : 'Under'}
            {range.min && range.max ? ' to ' : ' '}
            {range.max ? `$${range.max}` : '& above'}
          </Col>
        ))}
      </Col>
    </Row>
  );
}

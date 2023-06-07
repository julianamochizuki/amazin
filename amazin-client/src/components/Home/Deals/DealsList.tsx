import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { ProductType } from '../../../types/types';
import DealsListItem from './DealsListItem';
import '../../../styles/home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const DealsList = function () {
  const [deals, setDeals] = useState<ProductType[]>([]);
  const productFilter = useSelector(
    (state: RootState) => state.productFilters.currentProductFilter
  );
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `/api/products/deals?rating=${productFilter.rating}&min=${productFilter.minPrice}&max=${productFilter.maxPrice}`
      )
      .then((res) => {
        setDeals(res.data);
      })
      .catch((e) => {
        console.log('error fetching deals', e);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  const DealsItems = deals.map((d) => {
    return (
      <Col>
        <DealsListItem
        key={d.id}
        deal={d}
        />
      </Col>
    );
  });

  return (
    <Container className='home-container'>
      <div className="deals-header">
        <h4 className="home-subheading">Today's deals</h4>
        <p className="link-to-products" onClick={() => navigate('/deals')}>
          See all deals
        </p>
      </div>
      <Slider {...settings}>{DealsItems}</Slider>
    </Container>
  );
};

export default DealsList;

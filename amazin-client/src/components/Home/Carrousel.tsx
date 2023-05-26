import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

const Carrousel = function () {
  return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + '/images/mothers-day.png'}
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + '/images/gift-card.png'}
            alt="Second slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + '/images/try-prime.png'}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
  );
};

export default Carrousel;

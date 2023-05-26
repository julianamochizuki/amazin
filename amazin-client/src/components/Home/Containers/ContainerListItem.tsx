import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCurrentProductFilter } from '../../../app/productFilterReducer';
import { ContainerType } from '../../../types/types';

type Props = {
  container: ContainerType;
};

const ContainerListItem = function (props: Props) {
  const { container } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card
      className="pointer-cursor home-card home-container"
      onClick={() => {
        dispatch(resetCurrentProductFilter());
        navigate(container.path);
      }}
    >
      <Card.Title className='title'>{container.title}</Card.Title>
      <Card.Img className="card-image" src={container.image} />
      <Card.Text className="link-to-products">See more</Card.Text>
    </Card>
  );
};

export default ContainerListItem;

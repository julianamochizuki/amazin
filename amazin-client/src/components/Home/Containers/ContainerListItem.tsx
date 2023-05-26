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
    <Card>
      <Card.Title>{container.title}</Card.Title>
      <Card.Img src={container.image} />
      <Card.Text
        className="pointer-cursor"
        onClick={() => {
          dispatch(resetCurrentProductFilter());
          navigate(container.path);
        }}
      >
        Shop now
      </Card.Text>
    </Card>
  );
};

export default ContainerListItem;

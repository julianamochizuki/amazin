import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CategoryType } from '../../types/types';

type Props = {
  category: CategoryType;
  handleClick: any;
};

export default function CategoryListItem(props: Props) {
  const { category, handleClick } = props;

  return (
    <Nav.Link onClick={handleClick}>
      <Link to={`/products`}>{category.name}</Link>
    </Nav.Link>
  );
}

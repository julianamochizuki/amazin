import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  id: number;
  handleClick: any;
};

export default function CategoryListItem(props: Props) {
  const { name, handleClick } = props;

  return (
    <Nav.Link onClick={handleClick}>
      <Link to={`/products`}>{name}</Link>
    </Nav.Link>
  );
}

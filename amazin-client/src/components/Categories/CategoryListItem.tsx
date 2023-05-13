import React from 'react';
import { Nav } from 'react-bootstrap';

type Props = {
  name: string;
  id: number;
  handleClick: any;
};

export default function CategoryListItem(props: Props) {
  const { name, handleClick } = props;

  return <Nav.Link onClick={handleClick}>{name}</Nav.Link>;
}

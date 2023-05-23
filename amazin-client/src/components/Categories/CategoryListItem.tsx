import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CategoryType } from '../../types/types';

type Props = {
  category: CategoryType;
  setMenuOpen: any;
};

export default function CategoryListItem(props: Props) {
  const { category, setMenuOpen } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    setMenuOpen(false);
    navigate(`/categories/${category.id}/products`);
  };

  return <Nav.Link onClick={handleClick}>{category.name}</Nav.Link>;
}

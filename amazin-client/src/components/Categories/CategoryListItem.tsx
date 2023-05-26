import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CategoryType } from '../../types/types';
import { useDispatch } from 'react-redux';
import { resetCurrentProductFilter } from '../../app/productFilterReducer';

type Props = {
  category: CategoryType;
  setMenuOpen: any;
};

export default function CategoryListItem(props: Props) {
  const { category, setMenuOpen } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setMenuOpen(false);
    dispatch(resetCurrentProductFilter());
    navigate(`/categories/${category.id}/products`);
  };

  return <Nav.Link onClick={handleClick}>{category.name}</Nav.Link>;
}

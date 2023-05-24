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
  const productFilter = {
    rating: 0,
    minPrice: 0,
    maxPrice: 1000000,
  };

  console.log('category', category.id);

  const handleClick = () => {
    setMenuOpen(false);
    // navigate(`/categories/${category.id}/products`);
    navigate(
      `/categories/${category.id}/products/${productFilter.rating}/${productFilter.minPrice}/${productFilter.maxPrice}`
    );
  };

  return <Nav.Link onClick={handleClick}>{category.name}</Nav.Link>;
}

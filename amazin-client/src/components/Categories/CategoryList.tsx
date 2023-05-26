import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCurrentProductFilter } from '../../app/productFilterReducer';
import { DepartmentType } from '../../types/types';
import CategoryListItem from './CategoryListItem';

type Props = {
  currentDepartment: DepartmentType;
  setMenuOpen: any;
};

export default function CategoryList(props: Props) {
  const { currentDepartment, setMenuOpen } = props;
  const { categories } = currentDepartment;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryLists = categories.map((c) => {
    return (
      <CategoryListItem key={c.id} setMenuOpen={setMenuOpen} category={c} />
    );
  });

  const handleClick = () => {
    setMenuOpen(false);
    dispatch(resetCurrentProductFilter());
    navigate(`/departments/${currentDepartment.id}/products`);
  };

  return (
    <>
      <Nav.Link onClick={handleClick}>All {currentDepartment.name}</Nav.Link>
      {categoryLists}
    </>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryType, DepartmentType } from '../../types/types';
import CategoryListItem from './CategoryListItem';

type Props = {
  currentDepartment: DepartmentType;
  currentCategory: CategoryType;
  setCurrentCategory: any;
  setMenuOpen: any;
};

export default function CategoryList(props: Props) {
  const { currentDepartment, currentCategory, setCurrentCategory, setMenuOpen } = props;
  const { categories } = currentDepartment;
  const navigate = useNavigate();


  const categoryLists = categories.map((c) => {
    return (
      <CategoryListItem
        key={c.id}
        category={c}
        handleClick={() => {
          setCurrentCategory({ ...c });
          setMenuOpen(false)
          navigate(`/categories/${c.id}/products`);
        }}
      />
    );
  });

  return <>{categoryLists}</>;
}

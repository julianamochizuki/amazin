import React from 'react';
import { DepartmentType } from '../../types/types';
import CategoryListItem from './CategoryListItem';

type Props = {
  currentDepartment: DepartmentType;
  setCurrentCategory: any;
  setMenuOpen: any;
};

export default function CategoryList(props: Props) {
  const { currentDepartment, setCurrentCategory, setMenuOpen } = props;

  const { categories } = currentDepartment;

  const categoryLists = categories.map((c) => {
    return (
      <CategoryListItem
        key={c.id}
        category={c}
        handleClick={() => {
          setCurrentCategory({ ...c });
          setMenuOpen(false);
        }}
      />
    );
  });

  return <>{categoryLists}</>;
}

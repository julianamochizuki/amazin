import React from 'react';
import { DepartmentType } from '../../types/types';
import CategoryListItem from './CategoryListItem';

type Props = {
  currentDepartment: DepartmentType;
  setMenuOpen: any;
};

export default function CategoryList(props: Props) {
  const { currentDepartment, setMenuOpen } = props;
  const { categories } = currentDepartment;

  const categoryLists = categories.map((c) => {
    return (
      <CategoryListItem
        key={c.id}
        setMenuOpen={setMenuOpen}
        category={c}
      />
    );
  });

  return <>{categoryLists}</>;
}

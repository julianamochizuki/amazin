import React from 'react';
import CategoryListItem from './CategoryListItem';

type Props = {
  currentDepartment: {
    id: number;
    name: string;
    categories: any[];
  };
  setCurrentDepartment: any;
  handleClick: any;
};

export default function CategoryList(props: Props) {
  const { currentDepartment, handleClick } = props;

  const { categories } = currentDepartment;

  console.log('currentDepartment', currentDepartment, 'categories', categories);

  const categoryLists = categories.map((category) => {
    return (
      <CategoryListItem
        key={category.id}
        id={category.id}
        name={category.name}
        handleClick={handleClick}
      />
    );
  });

  return <>{categoryLists}</>;
}

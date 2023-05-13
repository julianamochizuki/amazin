import React from 'react';
import CategoryListItem from './CategoryListItem';

type Props = {
  currentDepartment: {
    id: number;
    name: string;
    categories: any[];
  };
  setCurrentCategory: any;
  setMenuOpen: any;
};

export default function CategoryList(props: Props) {
  const { currentDepartment, setCurrentCategory, setMenuOpen } = props;

  const { categories } = currentDepartment;

  console.log('currentDepartment', currentDepartment, 'categories', categories);

  const categoryLists = categories.map((c) => {
    return (
      <CategoryListItem
        key={c.id}
        id={c.id}
        name={c.name}
        handleClick={() => {
          setCurrentCategory((prev: {}) => ({
            ...prev,
            id: c.id,
            name: c.name,
            products: c.products,
          }));
          setMenuOpen(false);
        }}
      />
    );
  });

  return <>{categoryLists}</>;
}

import React from 'react';
import { useContext } from 'react';
import { DataContext } from '../../providers/DataProvider';
import DepartmentListItem from './DepartmentListItem';

type Props = {
  isExpanded: boolean;
  setIsExpanded: any;
  setCurrentDepartment: any;
};

export default function DepartmentList(props: Props) {
  const { departments } = useContext(DataContext);
  const { setIsExpanded, setCurrentDepartment } = props;

  const departmentLists = departments.map((d) => {
    return (
      <DepartmentListItem
        key={d.id}
        id={d.id}
        name={d.name}
        handleSelect={() => {
          setCurrentDepartment((prev: {}) => ({
            ...prev,
            id: d.id,
            name: d.name,
            categories: d.categories,
          }));
          setIsExpanded(true);
        }}
      />
    );
  });

  return <>{departmentLists}</>;
}

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentDepartment } from '../../app/departmentReducer';
import { DepartmentType } from '../../types/types';
import DepartmentListItem from './DepartmentListItem';

type Props = {
  isExpanded: boolean;
  setIsExpanded: any;
};

export default function DepartmentList(props: Props) {
  const { setIsExpanded } = props;
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER_URL}/api/departments`)
      .then((res) => {
        setDepartments(res.data);
      });
  }, []);

  const departmentLists = departments.map((d) => {
    return (
      <DepartmentListItem
        key={d.id}
        department={d}
        handleSelect={() => {
          dispatch(setCurrentDepartment(d));
          setIsExpanded(true);
        }}
      />
    );
  });

  return <>{departmentLists}</>;
}

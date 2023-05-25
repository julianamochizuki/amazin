import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setCurrentDepartment,
  setDepartments,
} from '../../app/departmentReducer';
import { RootState } from '../../app/store';
import DepartmentListItem from './DepartmentListItem';
import { useSelector } from 'react-redux';

type Props = {
  isExpanded: boolean;
  setIsExpanded: any;
};

export default function DepartmentList(props: Props) {
  const { setIsExpanded } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER_URL}/api/departments`)
      .then((res) => {
        dispatch(setDepartments(res.data));
      });
  }, []);

  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );

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

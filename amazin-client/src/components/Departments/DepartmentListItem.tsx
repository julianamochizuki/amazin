import React from 'react';
import { Nav } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import { DepartmentType } from '../../types/types';

type Props = {
  department: DepartmentType;
  handleSelect: any;
};

export default function DepartmentListItem(props: Props) {
  const { department, handleSelect } = props;

  return (
    <Nav.Link onClick={handleSelect} className="drawer-item">
      <div className="department-container">
        <span>{department.name}</span>
        <ChevronRight className="chevron-icon" />
      </div>
    </Nav.Link>
  );
}

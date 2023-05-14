import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { ChevronCompactRight } from 'react-bootstrap-icons';
import { DepartmentType } from '../../types/types';

type Props = {
  department: DepartmentType;
  handleSelect: any;
};

export default function DepartmentListItem(props: Props) {
  const { department, handleSelect } = props;

  return (
    <Nav.Link onClick={handleSelect}>
      <Container className="drawer-item">
        {department.name}
        <ChevronCompactRight className="icon" />
      </Container>
    </Nav.Link>
  );
}

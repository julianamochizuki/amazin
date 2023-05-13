import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { ChevronCompactRight } from 'react-bootstrap-icons';

type Props = {
  name: string;
  id: number;
  handleSelect: any;
};

export default function DepartmentListItem(props: Props) {
  const { name, handleSelect } = props;

  return (
    <Nav.Link onClick={handleSelect}>
      <Container className="drawer-item">
        {name}
        <ChevronCompactRight className="icon" />
      </Container>
    </Nav.Link>
  );
}

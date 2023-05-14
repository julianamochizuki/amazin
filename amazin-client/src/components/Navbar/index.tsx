import React from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  Image,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { DepartmentType } from '../../types/types';
import Drawer from './Drawer';

type Props = {
  currentDepartment: DepartmentType;
  setCurrentDepartment: any;
  setCurrentCategory: any;
};

const NavBar = function (props: Props) {
  const { currentDepartment, setCurrentDepartment, setCurrentCategory } = props;

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand={false}>
      <div style={{ width: '100vw', marginBottom: -7 }}>
        <Row className="px-3">
          <Col xs={1} md={1} lg={1} className="d-flex align-items-center">
            <Navbar.Brand href="/">
              <Image
                src={process.env.PUBLIC_URL + '/logo.png'}
                height="50"
                width="110"
              />
            </Navbar.Brand>
          </Col>
          <Col xs={7} md={7} lg={7} className="d-flex align-items-center">
            <Form className="d-flex flex-grow-1">
              <FormControl
                type="search"
                placeholder="Search Amazin"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="warning">
                <Search />
              </Button>
            </Form>
          </Col>
          <Col xs={1} className="d-flex align-items-center">
            <Nav.Link href="#home" className="text-light">
              Hello, sign in
            </Nav.Link>
          </Col>
          <Col xs={1} className="d-flex align-items-center">
            <Nav.Link href="#features" className="text-light">
              Account & Lists
            </Nav.Link>
          </Col>
          <Col xs={1} className="d-flex align-items-center">
            <Nav.Link href="#pricing" className="text-light">
              Returns & Orders
            </Nav.Link>
          </Col>
          <Col xs={1} className="d-flex align-items-center">
            <Nav.Link href="/cart" className="text-light">
              Cart
            </Nav.Link>
          </Col>
        </Row>
        <Drawer
          currentDepartment={currentDepartment}
          setCurrentDepartment={setCurrentDepartment}
          setCurrentCategory={setCurrentCategory}
        />
      </div>
    </Navbar>
  );
};

export default NavBar;

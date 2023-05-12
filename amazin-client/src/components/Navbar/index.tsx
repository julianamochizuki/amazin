import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import { List, Search } from 'react-bootstrap-icons';

const NavBar = function () {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <div style={{width: "100vw" }}>
        <Row>
          <Col xs={1} md={1} lg={1}>
            <Navbar.Brand href="#home">
              <Image
                src={process.env.PUBLIC_URL + '/logo.png'}
                height="50"
                width="100"
              />
            </Navbar.Brand>
          </Col>
          <Col xs={7} md={7} lg={7}>
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
          <Col xs={4} md={4} lg={4}>
            <Nav>
              <Nav.Link href="#home" className="text-light">
                Hello, sign in
              </Nav.Link>
              <Nav.Link href="#features" className="text-light">
                Account & Lists
              </Nav.Link>
              <Nav.Link href="#pricing" className="text-light">
                Returns & Orders
              </Nav.Link>
              <Nav.Link href="#cart" className="text-light">
                Cart
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={12} lg={12}>
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="text-light">
                <List></List>All
              </Nav.Link>

              <Nav.Link href="#features" className="text-light">
                Best Sellers
              </Nav.Link>

              <Nav.Link href="#features" className="text-light">
                Deals Store
              </Nav.Link>

              <Nav.Link href="#features" className="text-light">
                Sell
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </div>
    </Navbar>
  );
};

export default NavBar;

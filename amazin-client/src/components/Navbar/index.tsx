import Cookies from 'js-cookie';
import React, { useState } from 'react';
import {
  Button,
  Col,
  Dropdown,
  Form,
  FormControl,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { DepartmentType } from '../../types/types';
import Drawer from './Drawer';
import '../../styles/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

type Props = {
  currentDepartment: DepartmentType;
  setCurrentDepartment: any;
  setCurrentCategory: any;
};

const NavBar = function (props: Props) {
  const { currentDepartment, setCurrentDepartment, setCurrentCategory } = props;
  const [show, setShow] = useState(false);
  const userName = Cookies.get('name');
  const navigate = useNavigate();

  const showDropdown = (e: any) => {
    setShow(!show);
  };
  const hideDropdown = (e: any) => {
    setShow(false);
  };

  const handleSignOut = () => {
    Cookies.remove('name');
    Cookies.remove('userId');
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand={false}>
      <div style={{ width: '100vw', marginTop: -7 }}>
        <Row>
          <Col className="d-flex align-items-center navbar-brand">
            <Navbar.Brand href="/">
              <Image
                src={process.env.PUBLIC_URL + '/logo.png'}
                height="50"
                width="110"
              />
            </Navbar.Brand>
          </Col>
          <Col className="text-light">
            <Row>Hello</Row>
            <Row>Select your address</Row>
          </Col>
          <Col md={6} className="d-flex align-items-center">
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
          <Col className="d-flex align-items-center justify-content-center">
            <Image
              src={process.env.PUBLIC_URL + '/images/canada-flag.png'}
              className="flag"
            />
          </Col>
          <Col
            className="text-light d-flex-column align-self-center"
            onClick={() => navigate('/login')}
          >
            <Row className="text-light">
              {userName ? `Hello, ${userName}` : 'Hello, sign in'}
            </Row>
            <Row className="text-light">
              <NavDropdown
                title="Account"
                className="text-light dropdown"
                id="basic-nav-dropdown"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <Dropdown.Item href={userName ? '/account' : '/login'}>
                  Your Account
                </Dropdown.Item>
                <Dropdown.Item href={userName ? '/orders' : '/login'}>
                  Your Orders
                </Dropdown.Item>
                {userName && (
                  <Dropdown.Item onClick={handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
                )}
              </NavDropdown>
            </Row>
          </Col>
          <Col className="d-flex align-items-center">
            <Nav.Link
              href={userName ? '/orders' : '/login'}
              className="text-light"
            >
              Returns & Orders
            </Nav.Link>
          </Col>
          <Col className="d-flex align-items-center">
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

import Cookies from 'js-cookie';
import React, { useState } from 'react';
import {
  Col,
  Dropdown,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from 'react-bootstrap';
import Drawer from './Drawer';
import '../../styles/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import SearchBar from '../SearchBar';

const NavBar = function () {
  const [show, setShow] = useState(false);
  const token = Cookies.get('token') || null;
  const decodedToken: { name?: string } | null = token
    ? jwt_decode(token)
    : null;
  const userName = decodedToken?.name || null;
  const navigate = useNavigate();

  const showDropdown = (e: any) => {
    setShow(!show);
  };
  const hideDropdown = (e: any) => {
    setShow(false);
  };

  const handleSignOut = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand={false}>
      <div style={{ width: '100vw', marginTop: -7 }}>
        <Row>
          <Col className="d-flex align-items-center navbar-brand">
            <Navbar.Brand onClick={() => navigate('/')}>
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
            <SearchBar />
            {/* <Form className="d-flex flex-grow-1">
              <FormControl
                type="search"
                placeholder="Search Amazin"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="warning">
                <Search />
              </Button>
            </Form> */}
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <Image
              src={process.env.PUBLIC_URL + '/images/canada-flag.png'}
              className="flag"
            />
          </Col>
          <Col
            className="text-light d-flex-column align-self-center"
            onClick={() => navigate(token ? '/account' : '/login')}
          >
            <Row className="text-light">
              {token ? `Hello, ${userName}` : 'Hello, sign in'}
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
                <Dropdown.Item
                  onClick={() => navigate(token ? '/profile' : '/login')}
                >
                  Your Account
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate(token ? '/orders' : '/login')}
                >
                  Your Orders
                </Dropdown.Item>
                {token && (
                  <Dropdown.Item onClick={handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
                )}
              </NavDropdown>
            </Row>
          </Col>
          <Col className="d-flex align-items-center">
            <Nav.Link
              onClick={() => navigate(token ? '/orders' : '/login')}
              className="text-light"
            >
              Returns & Orders
            </Nav.Link>
          </Col>
          <Col className="d-flex align-items-center">
            <Nav.Link className="text-light" onClick={() => navigate('/cart')}>
              Cart
            </Nav.Link>
          </Col>
        </Row>
        <Drawer />
      </div>
    </Navbar>
  );
};

export default NavBar;

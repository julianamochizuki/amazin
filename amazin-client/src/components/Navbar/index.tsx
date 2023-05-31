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
import { Cart } from 'react-bootstrap-icons';
import { CartType } from '../../types/types';

type Props = {
  cart: CartType;
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = function (props: Props) {
  const { cart, setTokenChanged } = props;
  const [show, setShow] = useState(false);
  const token = Cookies.get('token') || null;
  const decodedToken: { name?: string } | null = token
    ? jwt_decode(token)
    : null;
  const userName = decodedToken?.name || null;
  const firstName = userName?.split(' ')[0];
  const navigate = useNavigate();
  const showDropdown = (e: any) => {
    setShow(!show);
  };
  const hideDropdown = (e: any) => {
    setShow(false);
  };

  const handleSignOut = () => {
    Cookies.remove('token');
    navigate('/');
  };

  const handleDemoUser = () => {
    Cookies.set('token', process.env.REACT_APP_DEMO_USER_TOKEN!);
    setTokenChanged((prev) => !prev);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand={false}>
      <div style={{ width: '100vw', marginTop: -3 }}>
        <Row className="d-flex align-items-center mx-1">
          <Col className="d-flex align-self-center justify-content-center  navbar-brand">
            <Navbar.Brand onClick={() => navigate('/')}>
              <div className="nav-logo">
                <Image
                  className="pointer-cursor"
                  src={process.env.PUBLIC_URL + '/logo.png'}
                  height="50"
                  width="110"
                />
              </div>
            </Navbar.Brand>
          </Col>
          <Col className="text-light nav-text">
            <Row
              className="demo-user-container nav-account-link pointer-cursor"
              onClick={handleDemoUser}
            >
              Demo User
            </Row>
          </Col>
          <Col md={5} className="d-flex align-items-center">
            <SearchBar />
          </Col>
          <Col className="d-flex align-items-center justify-content-center flag-container">
            <Image
              src={process.env.PUBLIC_URL + '/images/canada-flag.png'}
              className="flag"
            />
          </Col>
          <Col
            className="text-light d-flex-column align-self-center justify-content-center  nav-text"
            onClick={() => navigate(token ? '/profile' : '/login')}
          >
            {token ? `Hello, ${firstName}` : 'Hello, sign in'}

            <Row className="text-light nav-text">
              <NavDropdown
                title="Account"
                className="text-light dropdown nav-account-link"
                id="basic-nav-dropdown"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <Dropdown.Item
                  onClick={() => navigate(token ? '/profile' : '/login')}
                  className="dropdown-item"
                >
                  Your Account
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate(token ? '/orders' : '/login')}
                  className="dropdown-item"
                >
                  Your Orders
                </Dropdown.Item>
                {token && (
                  <Dropdown.Item
                    onClick={handleSignOut}
                    className="dropdown-item"
                  >
                    Sign Out
                  </Dropdown.Item>
                )}
              </NavDropdown>
            </Row>
          </Col>
          <Col className="d-flex align-items-center justify-content-center nav-text">
            <Nav.Link
              onClick={() => navigate(token ? '/orders' : '/login')}
              className="text-light"
            >
              <Row>Returns</Row>
              <Row className="nav-account-link">& Orders</Row>
            </Nav.Link>
          </Col>
          <Col className="d-flex align-items-center justify-content-center  nav-text">
            <Nav.Link
              className="text-light nav-account-link nav-cart"
              onClick={() => navigate('/cart')}
            >
              <Col className="cart-wrapper">
                <span className="cart-count">{cart.length}</span>
                <Cart className="cart-icon" />
              </Col>
              <Col className="cart-text">Cart</Col>
            </Nav.Link>
          </Col>
        </Row>
        <Drawer />
      </div>
    </Navbar>
  );
};

export default NavBar;

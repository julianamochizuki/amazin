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
import SearchBar from '../SearchBar';
import { Cart } from 'react-bootstrap-icons';
import { CartType } from '../../types/types';
import { useDispatch } from 'react-redux';
import { setCurrentView } from '../../app/sellerDashboardViewReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from '../../app/userReducer';

type Props = {
  cart: CartType;
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = function (props: Props) {
  const { cart, setTokenChanged } = props;
  const [show, setShow] = useState(false);
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isSeller = currentUser.isSeller;
  const userName = CryptoJS.AES.decrypt(
    currentUser.name,
    process.env.REACT_APP_SECRET_KEY!
  ).toString(CryptoJS.enc.Utf8);
  const firstName = userName.split(' ')[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleDemoUser = (isSeller: boolean) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER_URL}/api/login`, {
        email: isSeller
          ? process.env.REACT_APP_DEMO_SELLER_EMAIL
          : process.env.REACT_APP_DEMO_USER_EMAIL,
        password: isSeller
          ? process.env.REACT_APP_DEMO_SELLER_PASSWORD
          : process.env.REACT_APP_DEMO_USER_PASSWORD,
      })
      .then((res) => {
        Cookies.set('token', res.data);
        const decodedToken: {
          name?: string;
          address?: string;
          email?: string;
          isSeller?: boolean;
          id?: number;
        } | null = res.data ? jwt_decode(res.data) : null;
        const user = {
          name: CryptoJS.AES.encrypt(
            decodedToken?.name!,
            process.env.REACT_APP_SECRET_KEY!
          ).toString(),
          address: CryptoJS.AES.encrypt(
            decodedToken?.address!,
            process.env.REACT_APP_SECRET_KEY!
          ).toString(),
          email: CryptoJS.AES.encrypt(
            decodedToken?.email!,
            process.env.REACT_APP_SECRET_KEY!
          ).toString(),
          isSeller: decodedToken?.isSeller,
          id: decodedToken?.id,
        };
        dispatch(setCurrentUser(user));
        setTokenChanged((prev) => !prev);
        navigate('/');
      });
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand={false}
    style={{height: 'fit-content', width: '100vw'}}
    >
      <div style={{ width: '100vw', marginTop: -3 }}>
        <Row className="d-flex align-items-center mx-1">
          <Col className="d-flex align-self-center justify-content-center  navbar-brand">
            <Image
              className="pointer-cursor nav-logo"
              src={process.env.PUBLIC_URL + '/logo.png'}
              height="50"
              width="110"
              onClick={() => navigate('/')}
            />
          </Col>
          <Col className="text-light nav-text">
            <Row
              className="demo-user-container nav-account-link pointer-cursor"
              onClick={() => handleDemoUser(false)}
            >
              Demo User
            </Row>
          </Col>
          <Col className="text-light nav-text">
            <Row
              className="demo-user-container nav-account-link pointer-cursor"
              onClick={() => handleDemoUser(true)}
            >
              Demo Seller
            </Row>
          </Col>
          <Col md={5} className="d-flex align-items-center">
            <SearchBar />
          </Col>
          <Col className="d-flex align-self-center justify-content-center">
            <Image
              src={process.env.PUBLIC_URL + '/images/canada-flag.png'}
              className="d-flex align-items-center justify-content-center flag-container flag"
            />
          </Col>
          <Col className="text-light d-flex-column align-self-center justify-content-center  nav-text">
            <Row
              onClick={() => navigate(token ? '/profile' : '/login')}
              className="pointer-cursor"
            >
              {token ? `Hello, ${firstName}` : 'Hello, sign in'}
            </Row>
            <Row className="text-light">
              <NavDropdown
                title="Account"
                className="text-light dropdown nav-account-link px-0"
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
                  onClick={() => {
                    dispatch(setCurrentView('Inventory'));
                    isSeller
                      ? navigate(token ? '/seller/dashboard' : '/login')
                      : navigate(token ? '/orders' : '/login');
                  }}
                  className="dropdown-item"
                >
                  {isSeller ? 'Seller Dashboard' : 'Your Orders'}
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
              onClick={() => {
                dispatch(setCurrentView('Inventory'));
                isSeller
                  ? navigate(token ? '/seller/dashboard' : '/login')
                  : navigate(token ? '/orders' : '/login');
              }}
              className="text-light"
            >
              <Row>{isSeller ? 'Seller' : 'Returns'}</Row>
              <Row className="nav-account-link">
                {isSeller ? 'Dashboard' : '& Orders'}
              </Row>
            </Nav.Link>
          </Col>

          {isSeller ? (
            <Col className="d-flex align-items-center justify-content-center nav-text">
              <Nav.Link
                className="text-light nav-cart"
                onClick={() => {
                  dispatch(setCurrentView('NewProduct'));
                  navigate('/seller/dashboard');
                }}
              >
                <Row>New</Row>
                <Row className="nav-account-link">Product</Row>
              </Nav.Link>
            </Col>
          ) : (
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
          )}
        </Row>
        <Drawer />
      </div>
    </Navbar>
  );
};

export default NavBar;

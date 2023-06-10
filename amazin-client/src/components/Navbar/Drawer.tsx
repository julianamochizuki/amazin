import React from 'react';
import {
  ArrowLeft,
  Github,
  Globe2,
  Linkedin,
  List,
  PersonCircle,
} from 'react-bootstrap-icons';
import { Col, Image, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { useState } from 'react';
import DepartmentList from '../Departments/DepartmentList';
import CategoryList from '../Categories/CategoryList';
import '../../styles/drawer.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { resetCurrentProductFilter } from '../../app/productFilterReducer';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import '../../styles/navbar.css';
import CryptoJS from 'crypto-js';
import { resetCurrentUser } from '../../app/userReducer';

type Props = {
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Drawer(props: Props) {
  const { setTokenChanged } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const currentDepartment = useSelector(
    (state: RootState) => state.departments.currentDepartment
  );
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userName = CryptoJS.AES.decrypt(
    currentUser.name,
    process.env.REACT_APP_SECRET_KEY!
  ).toString(CryptoJS.enc.Utf8);
  const firstName = userName.split(' ')[0];

  const isSmallScreen = window.innerWidth < 768;

  const handleAccountClick = () => {
    if (token) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
    setMenuOpen(false);
  };

  // const handleSignOutClick = () => {
  //   Cookies.remove('token');
  //   dispatch(resetCurrentUser());
  //   setMenuOpen(false);
  //   navigate('/');
  // };

  const handleSignOutClick = async () => {
    navigate('/');
    try {
      await Cookies.remove('token');
      dispatch(resetCurrentUser());
      setTokenChanged((prev) => !prev);
      setMenuOpen(false);
    } catch (e) {
      console.log('error signing out', e);
    }
  };

  const menu = isSmallScreen
    ? [
        {
          title: 'Best Sellers',
          path: '/bestsellers',
        },
        {
          title: 'Deals Store',
          path: '/deals',
        },
      ]
    : [
        {
          title: 'Best Sellers',
          path: '/bestsellers',
        },
        {
          title: 'Deals Store',
          path: '/deals',
        },
        {
          title: 'Books',
          path: '/departments/3/products',
        },
        {
          title: 'Health & Beauty',
          path: '/departments/1/products',
        },
      ];

  return (
    <Navbar
      variant="dark"
      expand={false}
      style={{ backgroundColor: '#222F3E', marginBottom: -10 }}
      className="px-3 navbar-2"
    >
      <div className="d-flex align-items-center nav-text-2">
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-false-${false}`}
          className="text-light toggle"
          onClick={() => {
            setIsExpanded(false);
            setMenuOpen(true);
          }}
        >
          <List />
          <span className="nav-text-2">All</span>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-false-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-false-${false}`}
          placement="start"
          show={menuOpen}
        >
          <Offcanvas.Header
            closeButton
            closeVariant="white"
            onClick={() => {
              setMenuOpen(false);
            }}
            style={{ backgroundColor: '#222F3E', color: 'white' }}
          >
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-false-${false}`}
              className="text-light pointer-cursor user"
              onClick={handleAccountClick}
            >
              <h5 className="d-flex align-items-center">
                <PersonCircle />
                <span>&nbsp;&nbsp;Hello, {token ? firstName : 'sign in'}</span>
              </h5>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {!isExpanded ? (
                <Nav.Item className="drawer-section">
                  <Nav.Item className="subheading">Shop By Department</Nav.Item>
                  <DepartmentList
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                  />
                </Nav.Item>
              ) : (
                <>
                  <Nav.Link
                    className="cursor-pointer drawer-section"
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    <span className="main-menu">
                      <ArrowLeft /> &nbsp;MAIN MENU
                    </span>
                  </Nav.Link>
                  <Nav.Item className="drawer-section">
                    <Nav.Item className="subheading">
                      {currentDepartment!.name}
                    </Nav.Item>
                    <CategoryList
                      currentDepartment={currentDepartment!}
                      setMenuOpen={setMenuOpen}
                    />
                  </Nav.Item>
                </>
              )}
              {!isExpanded && (
                <Nav.Item className="drawer-section">
                  <Nav.Item className="subheading">Settings</Nav.Item>
                  <Nav.Link onClick={handleAccountClick}>Your Account</Nav.Link>
                  <Nav.Link
                    onClick={
                      token
                        ? handleSignOutClick
                        : () => {
                            navigate('/login');
                            setMenuOpen(false);
                          }
                    }
                  >
                    {token ? 'Sign Out' : 'Sign in'}
                  </Nav.Link>
                </Nav.Item>
              )}
              {!isExpanded && (
                <Nav.Item className="drawer-section">
                  <Nav.Item className="subheading">Meet The Developer</Nav.Item>
                  <Nav.Link>
                    <Row>
                      <Col xs={2}>
                        <Image
                          src="https://media.licdn.com/dms/image/C5603AQHq3PqasQyTHQ/profile-displayphoto-shrink_400_400/0/1636783614052?e=1691625600&v=beta&t=eIGuQ8Ug1uN4nfZJTlC4uAFvMEGAVr18sSrtHBYFlNk"
                          className="developer-image"
                          onClick={() =>
                            window.open(
                              'https://www.linkedin.com/in/jmochizuki/',
                              '_blank'
                            )
                          }
                        />
                      </Col>
                      <Col xs={6} className="developer-info">
                        <span className="developer-details">
                          Juliana Mochizuki
                          <span>
                            <Linkedin
                              className="developer-contact"
                              onClick={() =>
                                window.open(
                                  'https://www.linkedin.com/in/jmochizuki/',
                                  '_blank'
                                )
                              }
                            />
                            <Github
                              className="developer-contact"
                              onClick={() =>
                                window.open(
                                  'https://www.github.com/julianamochizuki/',
                                  '_blank'
                                )
                              }
                            />
                            <Globe2
                              className="developer-contact"
                              onClick={() =>
                                window.open(
                                  'https://julianamochizuki.netlify.app//',
                                  '_blank'
                                )
                              }
                            />
                          </span>
                        </span>
                      </Col>
                    </Row>
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        {menu.map((item) => (
          <Nav.Link
            className="text-light nav-link"
            onClick={() => {
              dispatch(resetCurrentProductFilter());
              navigate(item.path);
            }}
          >
            {item.title}
          </Nav.Link>
        ))}
        {!token && (
          <Nav.Link
            className="text-light nav-link"
            onClick={() => {
              dispatch(resetCurrentProductFilter());
              navigate('/sell');
            }}
          >
            Sell
          </Nav.Link>
        )}
      </div>
    </Navbar>
  );
}

import React from 'react';
import { ArrowLeft, List, PersonCircle } from 'react-bootstrap-icons';
import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
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
import jwt_decode from 'jwt-decode';

export default function Drawer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const currentDepartment = useSelector(
    (state: RootState) => state.departments.currentDepartment
  );
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const decodedToken: { name?: string } | null = token
    ? jwt_decode(token)
    : null;
  const userName = decodedToken?.name || null;
  const firstName = userName?.split(' ')[0];

  const handleSelect = () => {
    setIsExpanded(true);
  };

  const handleAccountClick = () => {
    if (token) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
    setMenuOpen(false);
  };

  const handleSignOutClick = () => {
    Cookies.remove('token');
    setMenuOpen(false);
    navigate('/');
  };

  const menu = [
    {
      title: 'Best Sellers',
      path: '/bestsellers',
    },
    {
      title: 'Deals Store',
      path: '/deals',
    },
    {
      title: 'Sell',
      path: '/seller/dashboard',
    },
    {
      title: 'Books',
      path: '/departments/1/products',
    },
    {
      title: 'Health & Beauty',
      path: '/departments/4/products',
    },
  ];

  return (
    <Navbar
      variant="dark"
      expand={false}
      style={{ backgroundColor: '#222F3E' }}
      className="px-3"
    >
      <div className="d-flex align-items-center">
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-false-${false}`}
          className="text-light toggle"
          onClick={() => {
            setIsExpanded(false);
            setMenuOpen(true);
          }}
        >
          <List />
          All
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
                  <Nav.Item className="fs-5 subheading">
                    Shop By Department
                  </Nav.Item>
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
                    <Nav.Item className="fs-5 subheading">
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
                  <Nav.Item className="fs-5 subheading">Settings</Nav.Item>
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
                  <Nav.Item className="fs-5 subheading">
                    Meet The Developer
                  </Nav.Item>
                  <Nav.Link onClick={handleSelect}>About Me</Nav.Link>
                  <Nav.Link onClick={handleSelect}>Icons</Nav.Link>
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
      </div>
    </Navbar>
  );
}

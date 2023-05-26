import React from 'react';
import { ArrowLeft, List } from 'react-bootstrap-icons';
import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import DepartmentList from '../Departments/DepartmentList';
import CategoryList from '../Categories/CategoryList';
import './Drawer.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { resetCurrentProductFilter } from '../../app/productFilterReducer';
import { useDispatch } from 'react-redux';

export default function Drawer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const currentDepartment = useSelector(
    (state: RootState) => state.departments.currentDepartment
  );
  const dispatch = useDispatch();

  const handleSelect = () => {
    setIsExpanded(true);
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
            onClick={() => {
              setMenuOpen(false);
            }}
            style={{ backgroundColor: '#222F3E' }}
          >
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-false-${false}`}
              className="text-light"
            >
              Hello, sign in
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {!isExpanded ? (
                <Nav.Item className="drawer-section">
                  <Nav.Item className="fs-5">Shop By Department</Nav.Item>
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
                    <span>
                      <ArrowLeft />
                      {' '}MAIN MENU
                    </span>
                  </Nav.Link>
                  <Nav.Item className="drawer-section">
                    <Nav.Item className="fs-5">
                      {currentDepartment!.name}
                    </Nav.Item>
                    <CategoryList
                      currentDepartment={currentDepartment!}
                      setMenuOpen={setMenuOpen}
                    />
                  </Nav.Item>
                </>
              )}
              <Nav.Item className="drawer-section">
                <Nav.Item className="fs-5">Settings</Nav.Item>
                <Nav.Link onClick={handleSelect}>Your Account</Nav.Link>
                <Nav.Link onClick={handleSelect}>Sign in</Nav.Link>
              </Nav.Item>
              <Nav.Item className="drawer-section">
                <Nav.Item className="fs-5">Meet The Developer</Nav.Item>
                <Nav.Link onClick={handleSelect}>About Me</Nav.Link>
                <Nav.Link onClick={handleSelect}>Icons</Nav.Link>
              </Nav.Item>
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

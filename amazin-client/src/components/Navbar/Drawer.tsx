import React from 'react';
import { List } from 'react-bootstrap-icons';
import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import DepartmentList from '../Departments/DepartmentList';
import CategoryList from '../Categories/CategoryList';
import './Drawer.css';
import { DepartmentType } from '../../types/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  currentDepartment: DepartmentType;
  setCurrentDepartment: any;
  setCurrentCategory: any;
};

export default function Drawer(props: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentDepartment, setCurrentDepartment, setCurrentCategory } = props;
  const navigate = useNavigate();

  const handleSelect = () => {
    setIsExpanded(true);
  };

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
                    setCurrentDepartment={setCurrentDepartment}
                  />
                </Nav.Item>
              ) : (
                <Nav.Item className="drawer-section">
                  <Nav.Item className="fs-5">{currentDepartment.name}</Nav.Item>
                  <CategoryList
                    currentDepartment={currentDepartment}
                    setCurrentCategory={setCurrentCategory}
                    setMenuOpen={setMenuOpen}
                  />
                </Nav.Item>
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
        <Nav.Link href="#features" className="text-light nav-link">
          Best Seller
        </Nav.Link>
        <Nav.Link href="#features" className="text-light nav-link">
          Deals Store
        </Nav.Link>
        <Nav.Link
          href="#features"
          className="text-light nav-link"
          onClick={() => navigate('/sell')}
        >
          Sell
        </Nav.Link>
      </div>
    </Navbar>
  );
}

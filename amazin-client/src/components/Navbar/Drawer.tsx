import React from 'react';
import { List } from 'react-bootstrap-icons';
import { Nav, Navbar, NavLink, Offcanvas } from 'react-bootstrap';
import './Drawer.css';

export default function Drawer() {
  return (
    <Navbar
      variant="dark"
      expand={false}
      style={{ backgroundColor: '#222F3E' }}
      className="px-3"
    >
      <div className="d-flex align-items-center">
        <NavLink>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-false-${false}`}
            className="text-light toggle"
          >
            <List />
            All
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-false-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-false-${false}`}
            placement="start"
          >
            <Offcanvas.Header
              closeButton
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
                <Nav.Link href="#action1">Shop By Department</Nav.Link>
                <Nav.Link href="#action2">Settings</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </NavLink>
        <Nav.Link href="#features" className="text-light nav-link">
          Best Seller
        </Nav.Link>
        <Nav.Link href="#features" className="text-light nav-link">
          Deals Store
        </Nav.Link>
        <Nav.Link href="#features" className="text-light nav-link">
          Sell
        </Nav.Link>
      </div>
    </Navbar>
  );
}

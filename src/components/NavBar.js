import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import Icon from "./Icon";
import css from "../css/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={css.navLink}>
              <Icon name="house" size={24} color="grey" />
              Home
            </Nav.Link>
            <Nav.Link className={css.navLink}>
              <Icon name="person" size={24} color="grey" />
              Sign In
            </Nav.Link>
            <Nav.Link className={css.navLink}>
              <Icon name="box-arrow-in-right" size={24} color="grey" />
              <span>Signup</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

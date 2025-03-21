/// IMPORTS ///

// Data / Api / Hooks / Context
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "../contexts/currentUserContexts";

// Media / CSS
import css from "../css/NavBar.module.css";
import logo from "../assets/logo.png";

// Components
import Icon from "./Icon";
import { Navbar, Container, Nav } from "react-bootstrap";

// NavBar component
const NavBar = () => {
  // set our current user context
  const currentUser = useCurrentUser();

  //use location hook, from react router to allow navigating
  const location = useLocation();

  // signup / signin should only be available if the user is logged out
  const loggedOutIcons = (
    <>
      <Nav.Link
        as={Link}
        to="/signin"
        className={`${css.NavLink} ${
          location.pathname === "/signin" ? css.Active : ""
        }`}
      >
        <Icon name="person" size={24} />
        Sign In
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/signup"
        className={`${css.NavLink} ${
          location.pathname === "/signup" ? css.Active : ""
        }`}
      >
        <Icon name="box-arrow-in-right" size={24} />
        <span>Signup</span>
      </Nav.Link>
    </>
  );

  // if user is logged in let's greet them
  const loggedInIcons = <p>Welcome back {currentUser?.username}</p>;

  return (
    <Navbar className={css.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`${css.NavLink} ${
                location.pathname === "/" ? css.Active : ""
              }`}
            >
              <Icon name="house" size={24} />
              Home
            </Nav.Link>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

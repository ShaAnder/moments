/// IMPORTS ///

// Data / Api / Hooks / Context
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/currentUserContexts";
import axios from "axios";

// Media / CSS
import css from "../css/NavBar.module.css";
import logo from "../assets/logo.png";

// Components
import Icon from "./Icon";
import Avatar from "./Avatar";
import { Navbar, Container, Nav } from "react-bootstrap";

// hooks
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

// NavBar component
const NavBar = () => {
  // get our user context
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // handle navbar toggle when clicking outside
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // get the current location to highlight active nav items
  const location = useLocation();

  // sign the user out
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Add post link if user is logged in
  const addPostIcon = (
    <Nav.Link
      as={Link}
      to="/posts/create"
      className={`${css.NavLink} ${
        location.pathname === "/posts/create" ? css.Active : ""
      }`}
    >
      <Icon name="plus-square" size={24} />
      New Post
    </Nav.Link>
  );

  // Logged-in user specific nav items
  const loggedInIcons = (
    <>
      <Nav.Link
        as={Link}
        to="/feed"
        className={`${css.NavLink} ${
          location.pathname === "/feed" ? css.Active : ""
        }`}
      >
        <Icon name="broadcast" size={24} /> Feed
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/liked"
        className={`${css.NavLink} ${
          location.pathname === "/liked" ? css.Active : ""
        }`}
      >
        <Icon name="heart" size={24} /> Likes
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/"
        onClick={handleSignOut}
        className={`${css.NavLink} ${location.pathname === "/"}`}
      >
        <Icon name="box-arrow-in-left" size={24} /> Sign Out
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={`/profiles/${currentUser?.profile_id}`}
        className={`${css.NavLink} ${location.pathname === "/posts/create"}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </Nav.Link>
    </>
  );

  // If logged out, show sign-in / sign-up options
  const loggedOutIcons = (
    <>
      <Nav.Link
        as={Link}
        to="/signin"
        className={`${css.NavLink} ${
          location.pathname === "/signin" ? css.Active : ""
        }`}
      >
        <Icon name="box-arrow-in-right" size={24} />
        Sign In
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/signup"
        className={`${css.NavLink} ${
          location.pathname === "/signup" ? css.Active : ""
        }`}
      >
        <Icon name="person-add" size={24} /> Sign Up
      </Nav.Link>
    </>
  );

  return (
    <Navbar expanded={expanded} className={css.NavBar} expand="md" fixed="top">
      <Container>
        <Nav.Link
          as={Link}
          to="/"
          className={`${css.NavLink} ${
            location.pathname === "/" ? css.Active : ""
          }`}
        >
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </Nav.Link>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded((prev) => !prev)}
          aria-controls="basic-navbar-nav"
        />
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

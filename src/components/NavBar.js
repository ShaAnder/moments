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

// NavBar component
const NavBar = () => {
  // set our current user context
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  //use location hook, from react router to allow navigating
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // icons for the posts
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

  // if user is logged in let's greet them
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
    <Navbar className={css.NavBar} expand="md" fixed="top">
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

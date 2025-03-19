import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import Icon from './Icon';
import css from '../css/NavBar.module.css';

const NavBar = () => {
    const location = useLocation();

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
                                location.pathname === '/' ? css.Active : ''
                            }`}
                        >
                            <Icon name="house" size={24} />
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/signin"
                            className={`${css.NavLink} ${
                                location.pathname === '/signin'
                                    ? css.Active
                                    : ''
                            }`}
                        >
                            <Icon name="person" size={24} />
                            Sign In
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/signup"
                            className={`${css.NavLink} ${
                                location.pathname === '/signup'
                                    ? css.Active
                                    : ''
                            }`}
                        >
                            <Icon name="box-arrow-in-right" size={24} />
                            <span>Signup</span>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;

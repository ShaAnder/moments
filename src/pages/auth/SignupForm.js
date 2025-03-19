import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import css from "../../css/SinInUpForm.module.css";
import btnCss from "../../css/Button.module.css";
import appCss from "../../App.module.css";

import axios from "axios";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";

const SignUpForm = () => {
  // create our state for signing up
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  // deconstruct our signup data so we don't need dot notation
  const { username, password1, password2 } = signUpData;

  // error state to hold any errors for display
  const [errors, setErrors] = useState({});

  // navigate const to redirect user
  const navigate = useNavigate();

  // handling for the signup / setting our data
  const handleSignupChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // handle our signup submit to db
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/signin");
    } catch (err) {
      console.log(err.username);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={css.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appCss.Content} p-4 `}>
          <h1 className={css.Header}>sign up</h1>
          <Form onSubmit={handleSignUpSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={css.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleSignupChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={css.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleSignupChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={css.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleSignupChange}
              />
            </Form.Group>

            <Button
              className={`${btnCss.Button} ${btnCss.Wide} ${btnCss.Bright}`}
              type="submit"
            >
              Signup
            </Button>
          </Form>
        </Container>
        <Container className={`mt-3 ${appCss.Content}`}>
          <Link className={css.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col md={6} className={`my-auto d-none d-md-block p-2 ${css.SignUpCol}`}>
        <Image
          className={`${appCss.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import css from "../../css/SignInUpForm.module.css";
import btnCss from "../../css/Button.module.css";
import appCss from "../../App.module.css";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      setErrors({});
      navigate("/signin");
    } catch (err) {
      if (err.response && err.response.data) {
        console.log("Error response:", err.response.data);
        setErrors(err.response.data);
      } else {
        console.error("Unknown error:", err);
        setErrors({ non_field_errors: ["An unknown error occurred."] });
      }
    }
  };

  return (
    <Row className={css.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appCss.Content} p-4 `}>
          <h1 className={css.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={css.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {Array.isArray(errors.username) &&
              errors.username.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={css.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {Array.isArray(errors.password1) &&
              errors.password1.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={css.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {Array.isArray(errors.password2) &&
              errors.password2.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
            <Button
              className={`${btnCss.Button} ${btnCss.Wide} ${btnCss.Bright}`}
              type="submit"
            >
              Sign up
            </Button>
            {Array.isArray(errors.non_field_errors) &&
              errors.non_field_errors.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
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

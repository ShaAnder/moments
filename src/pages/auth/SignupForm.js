import React, { useState } from "react";
import { Link } from "react-router-dom";

import css from "../../css/SinInUpForm.module.css";
import btnCss from "../../css/Button.module.css";
import appCss from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;
  return (
    <Row className={css.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appCss.Content} p-4 `}>
          <h1 className={css.Header}>sign up</h1>

          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={css.Input}
                type="text"
                placeholder="Username"
                name="username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={css.Input}
                type="password"
                placeholder="Password"
                name="password1"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={css.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
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

/// IMPORTS ///

// Data / Api / Hooks / Context
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/currentUserContexts";

// css
import css from "../../css/SignInUpForm.module.css";
import btnCss from "../../css/Button.module.css";
import appCss from "../../App.module.css";

// react bootstrap components
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";

// Function
function SignInForm() {
  // get our user context at the top of the component
  const setCurrentUser = useSetCurrentUser();

  // get our user being signed in state here
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  // destructure it so we can use it freely
  const { username, password } = signInData;

  // set error state here
  const [errors, setErrors] = useState({});

  // get our navigation here
  const navigate = useNavigate();

  // handler function for submitting form
  const handleSubmit = async (event) => {
    // prevent form submit / refresh
    event.preventDefault();
    // try call our api, if error set errors
    try {
      // we save the data from the api and set it as current user
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      console.log(data);
      setCurrentUser(data.user);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data);
      console.log("Test");
    }
  };

  // handler to handle our jsx changing, so the user can see their name/pw being typed
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  // JSX for form
  return (
    <Row className={css.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appCss.Content} p-4 `}>
          <h1 className={css.Header}>sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className={css.Input}
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Errors for our form components */}
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className={css.Input}
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnCss.Button} ${btnCss.Wide} ${btnCss.Bright}`}
              type="submit"
            >
              Sign in
            </Button>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appCss.Content}`}>
          <Link className={css.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>

      <Col md={6} className={`my-auto d-none d-md-block p-2 ${css.SignInCol}`}>
        <Image
          className={`${appCss.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;

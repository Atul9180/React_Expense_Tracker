import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signupAsyncThunk } from "../redux/authThunk";

import useAuthHook from "../customHooks/useAuthHook";

const Signup = () => {
  const [signupError, setSignupError] = useState("");

  const { redirectIfLoggedIn } = useAuthHook();

  useEffect(() => {
    redirectIfLoggedIn();
  }, [redirectIfLoggedIn]);

  const dispatch = useDispatch();

  const userNameRef = useRef();
  const userEmailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const emptyInputFields = () => {
    userNameRef.current.value = "";
    userEmailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const clearError = () => {
    setSignupError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setSignupError("");

    const name = userNameRef.current.value;
    const email = userEmailRef.current.value;
    const password = passwordRef.current.value;

    if (!name || !email || !password || !confirmPasswordRef.current.value) {
      setSignupError("All fields are required.");
      return;
    }
    if (passwordRef.current.value.length <= 4) {
      setSignupError("Password should have at least 5 characters!");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setSignupError("Password and confirm_Password do not match");
      return;
    }

    // try {
    //   const result = await signUpWithEmailPassword(email, password, name);

    //   if (!result.success) {
    //     setSignupError(result.error);
    //   } else {
    //     console.log("Registration successful:", result.user);
    //     alert("Registration Successful. Please Login!");
    //     emptyInputFields();
    //   }
    // }
    try {
      const result = await dispatch(
        signupAsyncThunk({ email, password, displayName: name })
      );

      if (signupAsyncThunk.fulfilled.match(result)) {
        console.log("Registration successful: ", result.payload);
        alert("Registration successful. Login!");
        emptyInputFields();
      } else {
        setSignupError(result.payload?.message || "Server Error during signup");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError("Error during signup.");
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Row
        className="p-4 pt-2 shadow border-rounded"
        style={{ minWidth: "50vw" }}
      >
        {signupError ? (
          <h3
            className="w-full text-center"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {signupError}
          </h3>
        ) : (
          ""
        )}
        <Col className="">
          <div className="mb-2 text-center">
            <h2>Sign Up</h2>
            <hr />
          </div>
          <Form onSubmit={handleSignup} onFocus={clearError}>
            <Form.Group controlId="userName" className="p-1">
              <Form.Label className="font-weight-bold mb-2">Name</Form.Label>
              <Form.Control
                ref={userNameRef}
                type="text"
                placeholder="Full Name"
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="p-1">
              <Form.Label className="font-weight-bold mb-2">Email</Form.Label>
              <Form.Control
                ref={userEmailRef}
                type="email"
                placeholder="Email address"
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="p-1">
              <Form.Label className="font-weight-bold mb-2">
                Password
              </Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmpassword" className="p-1">
              <Form.Label className="font-weight-bold mb-2">
                Confirm Password
              </Form.Label>
              <Form.Control
                ref={confirmPasswordRef}
                type="password"
                placeholder="Confirm Password"
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mt-3 mb-2">
              Register
            </Button>

            <span>
              Already have a account? <Link to="/login">Login</Link>
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

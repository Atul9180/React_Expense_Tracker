import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginAsyncThunk } from "../redux/authThunk";

import useAuthHook from "../customHooks/useAuthHook";

const Login = () => {
  const { redirectIfLoggedIn } = useAuthHook();

  useEffect(() => {
    redirectIfLoggedIn();
  }, [redirectIfLoggedIn]);

  const [loginError, setLoginError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmailRef = useRef();
  const passwordRef = useRef();

  const emptyInputFields = () => {
    userEmailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const clearError = () => {
    setLoginError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    const email = userEmailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setLoginError("All fields required.");
      return;
    }

    // try {
    //   const result = await loginWithEmailPassword(email, password);

    //   if (!result.success) {
    //     setLoginError(result.error);
    //     return;
    //   }
    //   console.log("Logged in successfully:", result.user);
    //   alert("Login Successful!");
    //   navigate("/");

    //   emptyInputFields();
    // }
    try {
      const result = await dispatch(loginAsyncThunk({ email, password }));
      if (loginAsyncThunk.fulfilled.match(result)) {
        console.log("Logged in successfully:", result.payload);
        alert("Login Successful!");
        navigate("/");

        emptyInputFields();
      } else {
        setLoginError(result.error.message || "Login error.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Login error. Please try again.");
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
        {loginError ? (
          <h3 style={{ color: "red", fontWeight: "bold" }}>{loginError}</h3>
        ) : (
          ""
        )}
        <Col className="">
          <div className="mb-2 text-center">
            <h2>Login</h2>
            <hr />
          </div>
          <Form onSubmit={handleLogin} onFocus={clearError}>
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

            <Button type="submit" variant="primary" className="w-100 mt-3 mb-2">
              Login
            </Button>

            <span>
              Don't have account? <Link to="/signup">Register</Link>
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

import React, { useRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import {
  loginWithEmailPassword,
  loginwithGoogleAccount,
} from "../firebase/authService";
import { FaGoogle } from "react-icons/fa";
import Loader from "../components/loader/Loader";

// import { useDispatch } from "react-redux";
// import { loginAsyncThunk } from "../redux/authThunk";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmailRef = useRef();
  const passwordRef = useRef();

  const emptyInputFields = () => {
    userEmailRef.current.value = "";
    passwordRef.current.value = "";
  };

  // signin with email password
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = userEmailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.error("All fields required.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await loginWithEmailPassword(email, password);

      if (!result.success) {
        toast.error(result.error);
        return;
      }
      console.log("Logged in successfully:", result.user);
      toast.success("Login Successful!");
      emptyInputFields();
      navigate("/");
    } catch (error) {
      toast.error(`Login error. Please try again. ${error}`);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //signin with google pop up:
  const signInWithGoogle = async () => {
    try {
      const result = await loginwithGoogleAccount();
      if (!result.success) {
        toast.error(result.error);
      } else {
        toast.success("logged in with Google!");
        console.log(result.user);
        navigate("/");
      }
    } catch (err) {
      toast.error(err);
      console.log(err.message);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >
      <Row
        className="p-4 pt-2 shadow border-rounded"
        style={{ minWidth: "50vw" }}
      >
        <Col className="">
          <div className="mb-2 text-center">
            <h2 style={{ color: "orange" }}>Login</h2>
            <hr />
          </div>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="email" className="p-1">
              <Form.Label className="font-weight-bold mb-1">Email</Form.Label>
              <Form.Control
                ref={userEmailRef}
                type="email"
                placeholder="Email address"
              />
            </Form.Group>

            <Form.Group controlId="password" className="p-1">
              <Form.Label className="font-weight-bold mb-1">
                Password
              </Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            {isLoading && <Loader />}

            <Button type="submit" variant="primary" className="w-100 mt-3 ">
              Login
            </Button>
            <div>
              <Link
                to="/resetpassword"
                className="wave-effect mt-1"
                style={{
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                Reset Password
              </Link>
            </div>
            <div className="text-center" style={{ fontWeight: "bold" }}>
              --- or ---
            </div>

            {/* Google Auth */}
            <Button
              variant="danger"
              className="wave-effect w-100 mt-2 "
              onClick={signInWithGoogle}
            >
              <FaGoogle />
              <span className="mx-1">Login with Google</span>
            </Button>

            {/* signup page */}
            <div className="text-center mt-1">
              <span style={{ fontWeight: "bold", color: "gray" }}>
                Don't have an account? <Link to="/signup">Register</Link>
              </span>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

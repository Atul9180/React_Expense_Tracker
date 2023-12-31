import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loginWithEmailPassword,
  loginwithGoogleAccount,
} from "../firebase/authService";
import { FaGoogle } from "react-icons/fa";
import Loader from "../components/loader/Loader";
import { useDispatch } from "react-redux";
import { SetActiveUserState } from "../redux/features/userSlice";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emptyInputFields = () => {
    setEnteredEmail("");
    setPassword("");
  };

  // generic login
  const genericSignIn = async (callback) => {
    try {
      setIsLoading(true);
      const result = await callback();
      if (result.success) {
        const {
          email,
          accessToken,
          uid,
          displayName,
          emailVerified,
          photoURL,
        } = result?.user;

        dispatch(
          SetActiveUserState({
            email,
            accessToken,
            uid,
            displayName,
            emailVerified,
            photoURL,
          })
        );
        toast.success("Login Successful!");
        emptyInputFields();
        navigate("/");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      // console.log("error login caught");
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // signin with email password
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!enteredEmail || !password) {
      toast.error("All fields required.");
      return;
    }
    await genericSignIn(() => loginWithEmailPassword(enteredEmail, password));
  };

  // signin with google pop up
  const signInWithGoogle = async () => {
    await genericSignIn(loginwithGoogleAccount);
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
                type="email"
                placeholder="Email address"
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="p-1">
              <Form.Label className="font-weight-bold mb-1">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../components/loader/Loader";
import { signUpWithEmailPassword } from "../firebase/authService";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const emptyInputFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (password.length <= 4) {
      toast.error("Password should have at least 5 characters!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    try {
      setIsLoading(true);
      const result = await signUpWithEmailPassword(email, password);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        emptyInputFields();
        navigate("/login");
      }
    } catch (error) {
      toast.error(`Error during signup. ${error}`);
    } finally {
      setIsLoading(false);
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
        <Col>
          <div className="mb-2 text-center">
            <h2 style={{ color: "orange" }}>Sign Up</h2>
            <hr />
          </div>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="email" className="p-1">
              <Form.Label className="font-weight-bold mb-1">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <Form.Group controlId="confirmpassword" className="p-1">
              <Form.Label className="font-weight-bold mb-1">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {isLoading && <Loader />}

            <Button type="submit" variant="primary" className="w-100 mt-3 mb-2">
              Signup
            </Button>

            <div className="text-center">
              <span
                style={{
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                Already have an account?{" "}
                <Link to="/login" style={{ color: "black" }}>
                  Login
                </Link>
              </span>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

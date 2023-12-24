import React, { useRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../components/loader/Loader";
import { signUpWithEmailPassword } from "../firebase/authService";

// import { useDispatch } from "react-redux";
// import { signupAsyncThunk } from "../redux/authThunk";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const userEmailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const emptyInputFields = () => {
    userEmailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const email = userEmailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password || !confirmPasswordRef.current.value) {
      toast.error("All fields are required.");
      return;
    }
    if (passwordRef.current.value.length <= 4) {
      toast.error("Password should have at least 5 characters!");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.error("Password and confirm_Password do not match");
      return;
    }

    try {
      setIsLoading(true);
      const result = await signUpWithEmailPassword(email, password);

      if (!result.success) {
        toast.error(result.error);
      } else {
        console.log("Registration successful:", result.user);
        toast.success("Registration Successful. Please Login!");
        emptyInputFields();
        navigate("/login");
      }
    } catch (error) {
      toast.error(`Error during signup. ${error}`);
      console.log(error.message);
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

            <Form.Group controlId="confirmpassword" className="p-1">
              <Form.Label className="font-weight-bold mb-1">
                Confirm Password
              </Form.Label>
              <Form.Control
                ref={confirmPasswordRef}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            {/* {isLoading && <h6 className="w-100 mt-3 mb-2">Processing....</h6>} */}

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
                Already have a account?{" "}
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

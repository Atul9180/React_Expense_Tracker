import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import Loader from "../components/loader/Loader";
import { sendPasswordResetLinkOnEmail } from "../firebase/authService";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useDispatch();

  const userEmailRef = useRef();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const email = userEmailRef.current.value;

    if (!email) {
      toast.error("Email field required.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await sendPasswordResetLinkOnEmail(email);

      if (!result.success) {
        toast.error(result.message);
        return;
      } else {
        toast.success(result.message);
        userEmailRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.message);
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
        <Col className="">
          <div className="mb-2 text-center">
            <h2 style={{ color: "orange" }}>Reset Password</h2>
            <hr />
          </div>
          <Form onSubmit={handlePasswordReset}>
            <Form.Group controlId="email" className="p-1">
              <Form.Label className="font-weight-bold mb-1">Email</Form.Label>
              <Form.Control
                ref={userEmailRef}
                type="email"
                placeholder="enter email address"
              />
            </Form.Group>

            {isLoading && <Loader />}

            <Button type="submit" variant="primary" className="w-100 mt-3 ">
              Reset Password
            </Button>

            <div className="w-100 text-center mt-3">
              <Link
                to="/login"
                className="wave-effect mx-5"
                style={{
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="wave-effect mx-5"
                style={{
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                Register
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;

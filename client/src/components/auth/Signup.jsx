import React, { createRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Signup = () => {
  // const [status,setStatus]=useState(null);

  const usernameRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();

  const emptyInputFields = () => {
    usernameRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(usernameRef.current.value);
    console.log(passwordRef.current.value);
    console.log(confirmPasswordRef.current.value);
    alert("Form Submitted!");
    emptyInputFields();
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
      <Row className="p-4 pt-2 shadow border-rounded">
        <Col className="">
          <div className="mb-2 text-center">
            <h2>Sign Up</h2>
            <hr />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="p-1">
              <Form.Label className="font-weight-bold mb-2">Email</Form.Label>
              <Form.Control
                ref={usernameRef}
                type="text"
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
              Already have a account? <a href="/">Login</a>
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

import React from "react";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectedUser,
  selectedUserIsProfileComplete,
} from "../../redux/features/userSlice.js";

const UserProfileDetails = () => {
  const navigate = useNavigate();

  const user = useSelector(selectedUser);
  const { email, userName, emailVerified, photoURL } = user;
  const isProfileComplete = useSelector(selectedUserIsProfileComplete);
  const profileImg =
    photoURL ||
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "78vh" }}
    >
      <Row style={{ minWidth: "50%" }}>
        <Col className="m-4">
          <Card className="pb-4">
            <Card.Body className="text-center">
              <img
                src={profileImg}
                alt="UserProfileImage"
                className="rounded-circle"
                style={{ width: "180px" }}
                fluid="true"
              />
              <p
                className="text-muted mb-1 "
                style={{ fontWeight: "bolder", fontSize: "x-large" }}
              >
                Name: {userName}
              </p>
              <p
                className="text-muted mb-1"
                style={{ fontWeight: "bolder", fontSize: "larger" }}
              >
                Email: {email}
              </p>
              <p
                className="text-muted mb-1"
                style={{ fontWeight: "bolder", fontSize: "larger" }}
              >
                EmailVerified: {emailVerified ? "true" : "false"}
              </p>
              <p
                className="text-muted mb-4"
                style={{ fontWeight: "bolder", fontSize: "larger" }}
              >
                ProfileUpdated: {isProfileComplete ? "true" : "false"}
              </p>
              <div className="d-flex justify-content-center mb-2">
                <Button
                  onClick={() => navigate("/expenses")}
                  style={{ fontWeight: "bolder", fontSize: "larger" }}
                >
                  My Expenses
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfileDetails;

// import React from "react";
// import { Container, Row } from "react-bootstrap";

// import { useSelector } from "react-redux";
// import {
//   selectedUser,
//   selectedUserIsLoggedIn,
//   selectedUserIsProfileComplete,
// } from "../../redux/features/userSlice.js";

// const UserProfileDetails = () => {
// const user = useSelector(selectedUser);
// const { email, userName, emailVerified } = user;
// const isLoggedIn = useSelector(selectedUserIsLoggedIn);
// const isProfileComplete = useSelector(selectedUserIsProfileComplete);

//   return (
//     <>
//       <Row className="mb-4 mt-4">
//         <Container className="p-1 m-3 borderBottom shadow text-center">
//           <h2>User Details:</h2>
//         </Container>
//         <h6>Name: {userName}</h6>
//         <h6>Email: {email}</h6>
//         <h6>UserLoggedIn: {isLoggedIn ? "true" : "false"}</h6>
//         <h6>EmailVerified: {emailVerified ? "true" : "false"}</h6>
//         <h6>ProfileUpdated: {isProfileComplete ? "true" : "false"}</h6>
//       </Row>
//     </>
//   );
// };

// export default UserProfileDetails;

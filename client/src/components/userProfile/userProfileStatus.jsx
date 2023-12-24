import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Badge } from "react-bootstrap";
import ProfileForm from "./ProfileForm";
import { verifyEmail } from "../../utils/authUtils";

const UserProfileStatus = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleModal = () => setShowModal(!showModal);

  const getUserDataFromLocalStorage = () => {
    try {
      setIsLoading(true);
      const storedUserData = JSON.parse(localStorage.getItem("user"));
      if (storedUserData) {
        setError(null);
        return storedUserData;
      } else {
        setError("User data not found");
      }
    } catch (error) {
      setError("Error fetching user details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const res = getUserDataFromLocalStorage();
    setUser(res);
  }, []);

  const renderEmailBadge = () => {
    if (!user) return null;
    if (user.isEmailVerified) {
      return (
        <Badge pill bg="success" className="p-2 px-3">
          Email is Verified.
        </Badge>
      );
    } else {
      return (
        <Badge
          pill
          bg="danger"
          className="p-2 px-3"
          type="button"
          onClick={handleVerifyEmail}
        >
          Verify email
        </Badge>
      );
    }
  };

  const renderProfileBadge = () => {
    if (!user) return null;
    if (!user.isProfileUpdated) {
      return (
        <Badge pill bg="danger" className="p-2 px-3 mx-2">
          Your Profile is Incomplete.
          <Link onClick={toggleModal}>Complete Now</Link>
        </Badge>
      );
    } else {
      return (
        <Badge pill bg="success" className="p-2 px-3 mx-2">
          Your Profile is Complete.
        </Badge>
      );
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    await verifyEmail(user.token);
  };
  return (
    <Navbar className="shadow" style={{ background: "#e8ffff" }}>
      <Container className="d-flex justify-content-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <Navbar.Brand>Welcome to Expense Tracker</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {renderEmailBadge()}
              {renderProfileBadge()}
            </Navbar.Collapse>
          </>
        )}

        <ProfileForm showModal={showModal} toggleModal={toggleModal} />
      </Container>
    </Navbar>
  );
};

export default UserProfileStatus;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Badge } from "react-bootstrap";
import ProfileForm from "./ProfileForm";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  selectedUser,
  selectedUserIsLoggedIn,
  selectedUserIsProfileComplete,
} from "../../redux/features/userSlice.js";

import { sendEmailVerificationLink } from "../../firebase/authService.js";

const UserProfileStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [timerValue, setTimerValue] = useState(null);

  const user = useSelector(selectedUser);
  const { emailVerified } = user;
  const isProfileComplete = useSelector(selectedUserIsProfileComplete);
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);

  const toggleModal = () => setShowModal(!showModal);

  //sending email link:
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await sendEmailVerificationLink();
      if (res.success) {
        toast.success(res.message);
        setTimerValue(120000 / 1000);

        // Update UI based on timer expiration
        setTimeout(() => {
          setTimerValue(null); // Show the button again
        }, 120000);
      } else throw new Error(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //email verifiction Badge:
  const renderEmailBadge = () => {
    if (!isLoggedIn || !user || !emailVerified) {
      return (
        <>
          {timerValue !== null && (
            <Badge pill bg="warning" className="p-2 px-3">
              resend time:
              {` ${timerValue} sec`}
            </Badge>
          )}

          {timerValue === null && (
            <Badge
              pill
              bg="danger"
              className="p-2 px-3"
              type="button"
              onClick={handleVerifyEmail}
            >
              Verify email
            </Badge>
          )}
        </>
      );
    }
    return (
      <Badge pill bg="success" className="p-2 px-3">
        Email is Verified.
      </Badge>
    );
  };

  //profile updation badge:
  const renderProfileBadge = () => {
    if (!isLoggedIn || !user || !isProfileComplete) {
      return (
        <Badge pill bg="danger" className="p-2 px-3 mx-2">
          Your Profile is Incomplete.
          <Link onClick={toggleModal}> Complete Now </Link>
        </Badge>
      );
    }
    return (
      <Badge pill bg="success" className="p-2 px-2 mx-2">
        Profile is Complete.<Link onClick={toggleModal}> Update Now</Link>
      </Badge>
    );
  };

  return (
    <Navbar className="shadow" style={{ background: "#e8ffff" }}>
      <Container className="d-flex justify-content-center">
        <Navbar.Brand>Welcome to Expense Tracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {renderEmailBadge()}
          {renderProfileBadge()}
        </Navbar.Collapse>

        <ProfileForm showModal={showModal} toggleModal={toggleModal} />
      </Container>
    </Navbar>
  );
};

export default UserProfileStatus;

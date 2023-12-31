import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { updateUserProfileData } from "../../firebase/authService.js";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  SetProfileUpdateStatus,
  selectedUser,
} from "../../redux/features/userSlice";

const ProfileForm = ({ showModal, toggleModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(selectedUser);
  const { userName, photoURL } = user;

  const clearInputs = () => {
    setName("");
    setImageFile(null);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!name || !imageFile) return;

    try {
      setIsLoading(true);

      const result = await updateUserProfileData(name, imageFile);

      if (result.success && result?.user) {
        const { name, profileImage, isProfileUpdated } = result?.user;
        toast.success(result?.message);
        dispatch(
          SetProfileUpdateStatus({ name, profileImage, isProfileUpdated })
        );
        clearInputs();
        toggleModal();
      } else if (!result?.success) throw new Error(result.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userName) setName(userName || "");
    if (photoURL) setImageFile(photoURL || null);
  }, [userName, photoURL]);

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        show={showModal}
        onHide={toggleModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update your Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* {isLoading ? (
          <Loader />
        ) : ( */}
          <Form onSubmit={handleProfileUpdate}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Full name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoto" className="mt-2">
              <Form.Label>Photo:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
              <Form.Text className="text-muted">
                *size should be less than 500kb(png,jpg,jpeg)
              </Form.Text>
            </Form.Group>

            <Modal.Footer>
              <Button type="submit" variant="primary">
                Update
              </Button>
              <Button variant="danger" onClick={toggleModal}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileForm;

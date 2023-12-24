import React, { useRef, useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { saveUserProfileAsyncThunk } from "../../redux/authThunk";

const ProfileForm = ({ showModal, toggleModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const nameRef = useRef();
  const imageRef = useRef();

  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state?.auth.user);
  // console.log(user);

  const clearInputs = () => {
    nameRef.current.value = "";
    imageRef.current.value = "";
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const imageFile = imageRef.current.files[0];

    if (!name || !imageFile) return;

    try {
      setIsLoading(true);
      console.log(name, imageFile);
      const result = { name, imageFile };

      if (result) {
        // const data = { ...user, result };
        // console.log("updated successfully:", data.payload);
        console.log(result);
        clearInputs();
        toggleModal();
      }
    } catch (error) {
      setError(error);
      console.log("Error in updating profile: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("user"));
      if (storedData) {
        nameRef.current.value = storedData.name || "";
        imageRef.current.value = storedData.profileImage || "";
      }
    } catch (error) {
      setError("Error fetching user details");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
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
        {error && <p>Error: {error}</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Form onSubmit={handleProfileUpdate}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                ref={nameRef}
                type="text"
                placeholder="Enter Full name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoto" className="mt-2">
              <Form.Label>Photo:</Form.Label>
              <Form.Control ref={imageRef} type="file" required />
              <Form.Text className="text-muted">
                *size should be less than 500kb(png,jpg,jpeg)
              </Form.Text>
            </Form.Group>

            <Modal.Footer>
              {isLoading && <h6>Processing...</h6>}
              {!isLoading && (
                <>
                  <Button type="submit" variant="primary">
                    Update
                  </Button>
                  <Button variant="danger" onClick={toggleModal}>
                    Close
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ProfileForm;

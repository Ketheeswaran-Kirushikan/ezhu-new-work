import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const UserDetailsModal = ({ user, onClose }) => {
  const notifySuccess = () => {
    toast.success("Your data was saved successfully");
  };
  const notifyError = () => {
    toast.error("Error saving data. Please try again.");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3002/Ezhu/skilledworker/createSkilledPerson/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        notifySuccess();
      } else {
        notifyError();
        console.log("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.log("Error creating user:", error);
      notifyError();
    }
  };

  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>User ID: {user._id}</p>
          <p>
            User Name: {user.first_name} {user.last_name}
          </p>
          <p>Email: {user.email}</p>
          <p>Number: {user.number}</p>
          <p>Gender: {user.gender}</p>
          <p>Birth Date: {new Date(user.birthDate).toLocaleDateString()}</p>
          <p>Skill: {user.skill.join(", ")}</p>
          <p>Role: {user.role}</p>
          <p>National ID: {user.nationalid}</p>
          <p>District: {user.district}</p>
          <p>
            Image:{" "}
            {user.images && (
              <img
                src={user.images}
                alt="Design"
                style={{ width: "100px", height: "auto" }}
              />
            )}
          </p>
          <p>Reference Numbers: {user.referenceNumbers}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const UserDetails = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <ToastContainer />
      <Button variant="primary" onClick={handleShowModal} className="me-2">
        <FontAwesomeIcon icon={faEye} />
      </Button>
      {showModal && <UserDetailsModal user={user} onClose={handleCloseModal} />}
    </>
  );
};

export default UserDetails;

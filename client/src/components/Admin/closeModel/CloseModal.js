import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import backendUrl from "../../../context/Config";

const CloseModal = ({ user, onClose, onDelete }) => {
  const notifySuccess = () => {
    toast.success("User deleted successfully");
  };

  const notifyError = () => {
    toast.error("Error deleting user. Please try again.");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${backendUrl}/Ezhu/skilledworker/deleteSkilledPerson/${user._id}`
      );
      notifySuccess();
      onDelete();
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
      notifyError();
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {user.first_name} {user.last_name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const UserDetails = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <ToastContainer />
      <button className="btn btn-danger" onClick={handleShowModal}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {showModal && <CloseModal user={user} onClose={handleCloseModal} />}
    </>
  );
};

export default UserDetails;

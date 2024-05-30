import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./CreateInvestorModel.css";
import Input from "../../../../../components/input/Input";

const CreateInvestorModel = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    birthDate: "",
    nationalid: "",
    district: "",
    images: null,
    companyName: "",
    registrationNumber: "",
  });

  const notifySuccess = () => {
    toast.success("Your data was created successfully");
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files[0] });
  };

  const validateForm = () => {
    const { first_name, last_name, email, birthDate, nationalid } = formData;
    if (!first_name || !last_name || !email || !birthDate || !nationalid) {
      notifyError("All fields are required.");
      return false;
    }

    if (!/^[A-Z]/.test(first_name) || !/^[A-Z]/.test(last_name)) {
      notifyError(
        "First name and last name should start with a capital letter."
      );
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      notifyError("Invalid email address.");
      return false;
    }

    const birthYear = new Date(birthDate).getFullYear();
    const age = new Date().getFullYear() - birthYear;
    if (age < 18) {
      notifyError("Age should be greater than 18.");
      return false;
    }

    if (!/^\d{9}[A-Za-z]$|^\d{12}$/.test(nationalid)) {
      notifyError("Invalid NIC format.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = new FormData();
    for (const key in formData) {
      userData.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/Ezhu/Investor/createInvestorPersonAdmin",
        userData
      );
      notifySuccess();
      onClose();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        notifyError(`Error creating data: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        notifyError("No response from the server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        notifyError("Error creating data. Please try again.");
      }
    }
  };

  return (
    <>
      <Modal show={true} onHide={onClose} className="custom-model-content">
        <Modal.Header closeButton>
          <Modal.Title>Create Investor</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>
              <Input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Last Name:</label>
              <Input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Email:</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Number:</label>
              <Input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>

            <div>
              <label>Birth Date:</label>
              <Input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>National ID:</label>
              <Input
                type="text"
                name="nationalid"
                value={formData.nationalid}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>District:</label>
              <Input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Company name:</label>
              <Input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Registration Number:</label>
              <Input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Images:</label>
              <Input
                type="file"
                name="images"
                onChange={handleImageChange}
                className="inputTypeEdit"
              />
            </div>
          </form>
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
      <button
        className="btn btn-secondary plus-button"
        onClick={handleShowModal}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>Add New User</span>
      </button>
      {showModal && (
        <CreateInvestorModel user={user} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default UserDetails;

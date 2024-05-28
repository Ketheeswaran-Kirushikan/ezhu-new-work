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
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    birthdayDate: "",
    nationalId: "",
    district: "",
    image: null,
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
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateForm = () => {
    const { firstName, lastName, emailAddress, birthdayDate, nationalId } =
      formData;
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !birthdayDate ||
      !nationalId
    ) {
      notifyError("All fields are required.");
      return false;
    }

    if (!/^[A-Z]/.test(firstName) || !/^[A-Z]/.test(lastName)) {
      notifyError(
        "First name and last name should start with a capital letter."
      );
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
      notifyError("Invalid email address.");
      return false;
    }

    const birthYear = new Date(birthdayDate).getFullYear();
    const age = new Date().getFullYear() - birthYear;
    if (age < 18) {
      notifyError("Age should be greater than 18.");
      return false;
    }

    if (!/^\d{9}[A-Za-z]$|^\d{12}$/.test(nationalId)) {
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
      await axios.post(
        "http://localhost:3002/Ezhu/Investor/createInvestorPersonAdmin",
        userData
      );
      notifySuccess();
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
      notifyError("Error creating data. Please try again.");
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Last Name:</label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Email:</label>
              <Input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>Number:</label>
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>

            <div>
              <label>Birth Date:</label>
              <Input
                type="date"
                name="birthdayDate"
                value={formData.birthdayDate}
                onChange={handleChange}
                className="inputTypeEdit"
              />
            </div>
            <div>
              <label>National ID:</label>
              <Input
                type="text"
                name="nationalId"
                value={formData.nationalId}
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

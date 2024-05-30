import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./CreateSkillModel.css";
import Input from "../../../../../components/input/Input";
import backendUrl from "../../../../../context/Config";

const CreateSkillModel = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    gender: "",
    birthDate: "",
    skill: "",
    nationalid: "",
    district: "",
    images: null,
    referenceNumbers: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const notifySuccess = () => {
    toast.success("Your data was created successfully");
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error when the input changes
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files[0] });
  };

  const validateForm = () => {
    const {
      first_name,
      last_name,
      email,
      number,
      gender,
      birthDate,
      skill,
      nationalid,
      district,
      referenceNumbers,
    } = formData;
    const errors = {};

    // Check for empty inputs

    if (!first_name) {
      errors.first_name = "First name is required.";
    }
    if (!last_name) {
      errors.last_name = "Last name is required.";
    }
    if (!email) {
      errors.email = "Email is required.";
    }
    if (!number) {
      errors.number = "Number is required.";
    }
    if (!gender) {
      errors.gender = "Gender is required.";
    }
    if (!birthDate) {
      errors.birthDate = "Birth date is required.";
    }
    if (!skill) {
      errors.skill = "Skill is required.";
    }
    if (!nationalid) {
      errors.nationalid = "NIC number is required.";
    }
    if (!district) {
      errors.district = "District is required.";
    }
    if (!referenceNumbers) {
      errors.referenceNumbers = "Reference Numbers are required.";
    }

    // firstname and lastname starting with a capital letter
    if (!errors.first_name && !/^[A-Z]/.test(first_name)) {
      errors.first_name = "First name should start with a capital letter.";
    }
    if (!errors.last_name && !/^[A-Z]/.test(last_name)) {
      errors.last_name = "Last name should start with a capital letter.";
    }
    // email validation
    if (
      !errors.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      errors.email = "Invalid email address.";
    }
    // NIC validation for 12 digit or 9 digit and one letter
    if (
      !errors.nationalid &&
      !/^[0-9]{9}[vVxX]?$/.test(nationalid) &&
      nationalid.length !== 12
    ) {
      errors.nationalid = "Invalid NIC number.";
    }
    // Age calculation and validation
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthDate).getFullYear();
    const age = currentYear - birthYear;
    if (!isNaN(age) && age < 18) {
      errors.birthDate = "Age should be greater than 18.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
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
        `${backendUrl}/Ezhu/skilledworker/createSkilledPersonAdmin`,
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
          <Modal.Title>Create Skill Person</Modal.Title>
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
              {formErrors.first_name && (
                <div className="error-message">{formErrors.first_name}</div>
              )}
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
              {formErrors.last_name && (
                <div className="error-message">{formErrors.last_name}</div>
              )}
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
              {formErrors.email && (
                <div className="error-message">{formErrors.email}</div>
              )}
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
              {formErrors.number && (
                <div className="error-message">{formErrors.number}</div>
              )}
            </div>
            <div>
              <label>Gender:</label>
              <br></br>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="inputTypeEdit"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
              {formErrors.birthDate && (
                <div className="error-message">{formErrors.birthDate}</div>
              )}
            </div>
            <div>
              <label>Skill:</label>
              <Input
                type="text"
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                className="inputTypeEdit"
              />
              {formErrors.skill && (
                <div className="error-message">{formErrors.skill}</div>
              )}
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
              {formErrors.nationalid && (
                <div className="error-message">{formErrors.nationalid}</div>
              )}
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
              {formErrors.district && (
                <div className="error-message">{formErrors.district}</div>
              )}
            </div>
            <div>
              <label>Reference Numbers:</label>
              <Input
                type="text"
                name="referenceNumbers"
                value={formData.referenceNumbers}
                onChange={handleChange}
                className="inputTypeEdit"
              />
              {formErrors.referenceNumbers && (
                <div className="error-message">
                  {formErrors.referenceNumbers}
                </div>
              )}
            </div>
            <div>
              <label>Images:</label>
              <Input
                type="file"
                name="images"
                onChange={handleImageChange}
                className="inputTypeEdit"
              />
              {formErrors.images && (
                <div className="error-message">{formErrors.images}</div>
              )}
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
      {showModal && <CreateSkillModel user={user} onClose={handleCloseModal} />}
    </>
  );
};

export default UserDetails;

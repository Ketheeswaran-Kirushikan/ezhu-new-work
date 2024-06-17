import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";
import RegisterPop from "../../../components/registerpop/RegisterPop";
import Input from "../../../components/input/Input";
import DatePickerComponent from "../../../components/DatePicker/DatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCode, faUser } from "@fortawesome/free-solid-svg-icons";

const SkilledWorkerSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    gender: "",
    birthDate: null,
    skill: "",
    nationalid: "",
    district: "",
    images: null,
    referenceNumbers: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear the error when the input changes
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });

    // Clear the error when the input changes
    setFormErrors({ ...formErrors, birthDate: "" });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files[0] });
  };

  const validateForm = (step) => {
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

    if (step === 1) {
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
    }

    if (step === 2) {
      if (!skill) {
        errors.skill = "Skill is required.";
      }
      if (!district) {
        errors.district = "District is required.";
      }
      if (!referenceNumbers) {
        errors.referenceNumbers = "Reference numbers are required.";
      }
      if (!formData.images) {
        errors.images = "Image is required.";
      }
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(2)) {
      return;
    }
    const userData = new FormData();
    for (const key in formData) {
      userData.append(key, formData[key]);
    }

    try {
      await axios.post(
        "http://localhost:3002/Ezhu/SkilledWorker/Request/createSkilledWorkerRequest",
        userData
      );
      togglePopup();
      alert("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("User creation failed");
    }
  };

  const handleNext = () => {
    if (validateForm(1)) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="container-fluid" id="grad1">
      <div className="row justify-content-center mt-0">
        <div className="card-ms col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
          <div className="px-0 pt-4 pb-0 mt-3 mb-3">
            <h2>
              <strong>Sign Up Your User Account</strong>
            </h2>
            <p>Fill all form fields to go to the next step</p>
            <div className="">
              <div className="card-ms col-md-12 mx-0">
                <form id="msform" onSubmit={handleSubmit}>
                  {/* Progressbar */}
                  <ul id="progressbar">
                    <li
                      className={currentStep === 1 ? "active" : ""}
                      id="personal"
                    >
                      <strong>Personal</strong>
                    </li>
                    <li
                      className={currentStep === 2 ? "active" : ""}
                      id="skill"
                    >
                      <strong>Skill</strong>
                    </li>
                  </ul>

                  {/* Fieldsets */}
                  {currentStep === 1 && (
                    <fieldset>
                      <div className="form-card">
                        <h2 className="fs-title">Personal Information</h2>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <Input
                              type="text"
                              className="form-control inputTypeSignup"
                              id="firstName"
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleChange}
                              placeholder={
                                formErrors.first_name
                                  ? ""
                                  : "Enter your first name"
                              }
                              required
                            />
                            {formErrors.first_name && (
                              <div className="error-message-handle-user">
                                {formErrors.first_name}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <Input
                              type="text"
                              className="form-control inputTypeSignup"
                              id="lastName"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleChange}
                              placeholder={
                                formErrors.last_name
                                  ? ""
                                  : "Enter your last name"
                              }
                              required
                            />
                            {formErrors.last_name && (
                              <div className="error-message-handle-user">
                                {formErrors.last_name}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <Input
                              type="email"
                              className="form-control inputTypeSignup"
                              id="emailAddress"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder={
                                formErrors.email
                                  ? ""
                                  : "Enter your email address"
                              }
                              required
                            />
                            {formErrors.email && (
                              <div className="error-message-handle-user">
                                {formErrors.email}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <select
                              className="form-control inputTypeSignup"
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              required
                            >
                              <option
                                value=""
                                disabled
                                className="genderOption"
                              >
                                Select your gender
                              </option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            {formErrors.gender && (
                              <div className="error-message-handle-user">
                                {formErrors.gender}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <Input
                              type="tel"
                              className="form-control inputTypeSignup"
                              id="phoneNumber"
                              name="number"
                              value={formData.number}
                              onChange={handleChange}
                              placeholder={
                                formErrors.number
                                  ? ""
                                  : "Enter your phone number"
                              }
                              required
                            />
                            {formErrors.number && (
                              <div className="error-message-handle-user">
                                {formErrors.number}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <Input
                              type="text"
                              className="form-control inputTypeSignup"
                              id="nationalId"
                              name="nationalid"
                              value={formData.nationalid}
                              onChange={handleChange}
                              placeholder={
                                formErrors.nationalid
                                  ? ""
                                  : "Enter your NIC number"
                              }
                              required
                            />
                            {formErrors.nationalid && (
                              <div className="error-message-handle-user">
                                {formErrors.nationalid}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row mb-4 display-of-date">
                          <DatePickerComponent
                            selected={formData.birthDate}
                            onChange={handleDateChange}
                            placeholderText={
                              formErrors.birthDate
                                ? ""
                                : "Select your birth date"
                            }
                            required
                          />
                          {formErrors.birthDate && (
                            <div className="error-message-handle-user">
                              {formErrors.birthDate}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="next action-button"
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    </fieldset>
                  )}

                  {currentStep === 2 && (
                    <fieldset>
                      <div className="form-card">
                        <h2 className="fs-title">Skill Information</h2>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <Input
                              type="text"
                              className="form-control inputTypeSignup"
                              id="skill"
                              name="skill"
                              value={formData.skill}
                              onChange={handleChange}
                              placeholder={
                                formErrors.skill ? "" : "Enter your skill"
                              }
                              required
                            />
                            {formErrors.skill && (
                              <div className="error-message-handle-user">
                                {formErrors.skill}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <Input
                              type="text"
                              className="form-control inputTypeSignup"
                              id="referenceNumbers"
                              name="referenceNumbers"
                              value={formData.referenceNumbers}
                              onChange={handleChange}
                              placeholder={
                                formErrors.referenceNumbers
                                  ? ""
                                  : "Enter reference numbers"
                              }
                              required
                            />
                            {formErrors.referenceNumbers && (
                              <div className="error-message-handle-user">
                                {formErrors.referenceNumbers}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <input
                              type="file"
                              className="form-control-file inputTypeSignup"
                              id="images"
                              name="images"
                              onChange={handleImageChange}
                              required
                            />

                            {formErrors.images && (
                              <div className="error-message-handle-user">
                                {formErrors.images}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <Input
                              type="text"
                              className="form-control inputTypeSignup"
                              id="district"
                              name="district"
                              value={formData.district}
                              onChange={handleChange}
                              placeholder={
                                formErrors.district ? "" : "Enter your district"
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="previous action-button-previous"
                        onClick={handlePrevious}
                      >
                        Previous
                      </button>
                      <button type="submit" className="submit action-button">
                        Submit
                      </button>
                    </fieldset>
                  )}
                  <div className="d-flex justify-content-center align-items-center mb-2 mt-4">
                    <p className="mb-0 me-2">Already have an account?</p>
                    <Link
                      to={"/login"}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Login
                    </Link>
                  </div>
                </form>
                {showPopup && (
                  <RegisterPop
                    showPopup={showPopup}
                    togglePopup={togglePopup}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkilledWorkerSignup;

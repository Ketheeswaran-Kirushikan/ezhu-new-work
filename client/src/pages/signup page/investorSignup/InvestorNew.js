import React, { useState, useEffect } from "react";
import axios from "axios";
import "./investorNew.css";
import { Link, useNavigate } from "react-router-dom";
import RegisterPop from "../../../components/registerpop/RegisterPop";
import Input from "../../../components/input/Input";
import DatePickerComponent from "../../../components/DatePicker/DatePicker";
import backendUrl from "../../../context/Config";

const InvestorNew = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    birthDate: null,
    nationalid: "",
    district: "",
    companyName: "",
    registrationNumber: "",
    images: null,
  });

  // Log showPopup changes for debugging
  useEffect(() => {
    console.log("showPopup:", showPopup);
  }, [showPopup]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });
    setFormErrors({ ...formErrors, birthDate: "" });
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
      birthDate,
      nationalid,
      district,
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
    if (!birthDate) {
      errors.birthDate = "Birth date is required.";
    }
    if (!nationalid) {
      errors.nationalid = "NIC number is required.";
    }
    if (!district) {
      errors.district = "District is required.";
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

  const togglePopup = () => {
    setShowPopup((prev) => {
      if (prev) navigate("/"); // Navigate to homepage when closing popup
      return !prev;
    });
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
        `${backendUrl}/Ezhu/Investor/Request/createInvestorRequest`,
        userData
      );
      console.log("Submission successful:", response.data);
      setShowPopup(true); // Directly set to true for clarity
    } catch (error) {
      console.error("Submission error:", error.response || error);
      setFormErrors({
        ...formErrors,
        submit: "User creation failed. Please try again.",
      });
    }
  };

  const handleNext = () => {
    if (validateForm()) {
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
              <strong>Sign Up Your Company Account</strong>
            </h2>
            <p>Fill all form fields to go to the next step</p>
            <div className="">
              <div className="card-ms col-md-12 mx-0">
                <form id="msform" onSubmit={handleSubmit}>
                  <ul id="progressbar">
                    <li
                      className={currentStep === 1 ? "active" : ""}
                      id="personal"
                    >
                      <strong>Personal</strong>
                    </li>
                    <li
                      className={currentStep === 2 ? "active" : ""}
                      id="company"
                    >
                      <strong>Company</strong>
                    </li>
                  </ul>

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
                                  : "Enter your national ID number"
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
                            id="birthDate"
                            name="birthDate"
                            selected={formData.birthDate}
                            onChange={handleDateChange}
                            placeholder={
                              formErrors.birthDate
                                ? ""
                                : "Enter your birth date"
                            }
                          />
                          {formErrors.birthDate && (
                            <div className="error-message-handle-user">
                              {formErrors.birthDate}
                            </div>
                          )}
                        </div>
                      </div>
                      <input
                        type="button"
                        name="next"
                        className="next action-button"
                        value="Next"
                        onClick={handleNext}
                      />
                    </fieldset>
                  )}
                  {currentStep === 2 && (
                    <fieldset>
                      <div className="form-card">
                        <h2 className="fs-title">Company Information</h2>
                        <div className="row mb-4">
                          <Input
                            type="text"
                            className="form-control inputTypeSignup inputTypeSignup-company"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Enter your company name"
                            required
                          />
                        </div>
                        <div className="row mb-4">
                          <Input
                            type="text"
                            className="form-control inputTypeSignup inputTypeSignup-company"
                            id="registrationNumber"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            placeholder="Enter your Company registration number"
                            required
                          />
                        </div>
                        <div className="row mb-4">
                          <Input
                            type="file"
                            accept="image/*"
                            className="form-control inputTypeSignup inputTypeSignup-company"
                            id="image"
                            name="images"
                            onChange={handleImageChange}
                            required
                          />
                        </div>
                        <div className="row mb-4">
                          <div className="form-check d-flex justify-content-center">
                            <Input
                              className="form-check-input me-3 border border-dark"
                              type="checkbox"
                              value=""
                              id="form2Example3c"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="form2Example3"
                            >
                              I do accept the{" "}
                              <a href="#!" className="">
                                <u>Terms and Conditions</u>
                              </a>{" "}
                              of your site.
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <input
                          type="button"
                          name="previous"
                          className="action-button-previous"
                          value="Previous"
                          onClick={handlePrevious}
                        />
                        <input
                          type="submit"
                          name="make_payment"
                          className="next action-button"
                          value="Submit"
                        />
                      </div>
                    </fieldset>
                  )}
                  {formErrors.submit && (
                    <div className="error-message-handle-user">
                      {formErrors.submit}
                    </div>
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
                    isOpen={showPopup}
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

export default InvestorNew;
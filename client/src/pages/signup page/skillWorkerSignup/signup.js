import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import Input from "../../../components/input/Input";
import { Link } from "react-router-dom";
import RegisterPop from "../../../components/registerpop/RegisterPop";

const Signup = () => {
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
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

  const togglePopup = () => {
    setShowPopup(!showPopup);
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

    if (!validateForm) {
      return;
    }
    const userData = new FormData();
    for (const key in formData) {
      userData.append(key, formData[key]);
    }

    try {
      await axios.post(
        `${process.env.BACK_END_URL}/Ezhu/Skillworker/Request/createSkilledPersonRequest`,
        userData
      );
      togglePopup();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("User creation failed");
    }
  };

  return (
    <section className="vh-100 gradient">
      <div className="container-fluid py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="text-center">
              <h1 className="mb-4 pb-2 pb-md-0 mb-md-5">Join with us</h1>
              <p className="mb-4 pb-2 pb-md-0 mb-md-5">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
              </p>
            </div>
            <div className="card-body p-4 p-md-5 signup-card">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-3">Registration Form</h3>
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" htmlFor="firstName"></label>
                      <Input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="inputTypeSignup"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formErrors.first_name && (
                  <div className="error-message-handle">
                    {formErrors.first_name}
                  </div>
                )}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" htmlFor="lastName"></label>
                      <Input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="inputTypeSignup"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formErrors.last_name && (
                  <div className="error-message-handle">
                    {formErrors.last_name}
                  </div>
                )}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <label
                        className="form-label"
                        htmlFor="emailAddress"
                      ></label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="inputTypeSignup"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formErrors.email && (
                  <div className="error-message-handle">{formErrors.email}</div>
                )}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <label
                        className="form-label"
                        htmlFor="phoneNumber"
                      ></label>
                      <Input
                        type="tel"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className="inputTypeSignup"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formErrors.number && (
                  <div className="error-message-handle">
                    {formErrors.number}
                  </div>
                )}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" htmlFor="gender"></label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="inputTypeSignup"
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="srow mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" htmlFor="birthDate"></label>
                      <Input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="inputTypeSignup"
                        placeholder="Select your birth date"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formErrors.birthDate && (
                  <div className="error-message-handle">
                    {formErrors.birthDate}
                  </div>
                )}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <label
                        className="form-label"
                        htmlFor="nationalId"
                      ></label>
                      <Input
                        type="text"
                        name="nationalid"
                        value={formData.nationalid}
                        onChange={handleChange}
                        className="inputTypeSignup"
                        placeholder="Enter your national ID"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formErrors.nationalid && (
                  <div className="error-message-handle">
                    {formErrors.nationalid}
                  </div>
                )}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" htmlFor="district"></label>
                      <Input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="inputTypeSignup"
                        placeholder="Enter your district"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formErrors.district && (
                  <div className="error-message-handle">
                    {formErrors.district}
                  </div>
                )}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" htmlFor="images"></label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="inputTypeSignup"
                        placeholder="Upload your images"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formErrors.images && (
                  <div className="error-message-handle">
                    {formErrors.images}
                  </div>
                )}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div data-mdb-input-init className="form-outline">
                      <Input
                        type="text"
                        name="referenceNumbers"
                        value={formData.referenceNumbers}
                        onChange={handleChange}
                        className="inputTypeSignup"
                        placeholder="Enter your reference numbers"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formErrors.referenceNumbers && (
                  <div className="error">{formErrors.referenceNumbers}</div>
                )}
                <div className="form-check d-flex justify-content-center mb-4 pb-3">
                  <input
                    className="form-check-input me-3 border border-dark"
                    type="checkbox"
                    value=""
                    id="form2Example3c"
                  />
                  <label className="form-check-label " htmlFor="form2Example3">
                    I do accept the{" "}
                    <a href="#!" className="">
                      <u>Terms and Conditions</u>
                    </a>{" "}
                    of your site.
                  </label>
                </div>
                <div className="row mt-4">
                  <div className="col-12 button-container">
                    <input
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                    <Link to="/" className="Link-tag">
                      <input
                        className="btn btn-secondary btn-lg"
                        type="button"
                        value="Cancel"
                      />
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <RegisterPop isOpen={showPopup} togglePopup={togglePopup} />
    </section>
  );
};

export default Signup;

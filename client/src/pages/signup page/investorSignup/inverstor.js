import React, { useState } from "react";
import axios from "axios";
import "./investor.css";
import { Link } from "react-router-dom";
import RegisterPop from "../../../components/registerpop/RegisterPop";
import Input from "../../../components/input/Input";

const Investor = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    birthDate: "",
    nationalid: "",
    district: "",
    companyName: "",
    registrationNumber: "",
    images: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files[0] });
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    for (const key in formData) {
      userData.append(key, formData[key]);
    }

    try {
      await axios.post(
        "http://localhost:3002/Ezhu/Investor/Request/createInvestorRequest",
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
              <form onSubmit={handleSubmit} className="form-changer">
                <div className="row mb-4">
                  <label htmlFor="firstName" className="Signup-label">
                    First Name
                  </label>
                  <Input
                    type="text"
                    className="form-control inputTypeSignup"
                    id="firstName"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="row mb-4">
                  <label htmlFor="lastName" className="Signup-label">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    className="form-control inputTypeSignup"
                    id="lastName"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                <div className="row mb-4">
                  <label htmlFor="emailAddress" className="Signup-label">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    className="form-control inputTypeSignup"
                    id="emailAddress"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="row mb-4">
                  <label htmlFor="phoneNumber" className="Signup-label">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    className="form-control inputTypeSignup"
                    id="phoneNumber"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="row mb-4">
                  <label htmlFor="birthDate" className="Signup-label">
                    Birth Date
                  </label>
                  <Input
                    type="date"
                    className="form-control inputTypeSignup"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    placeholder="Select your birth date"
                    required
                  />
                </div>
                <div className="row mb-4">
                  <label htmlFor="nationalId" className="Signup-label">
                    National ID
                  </label>
                  <Input
                    type="text"
                    className="form-control inputTypeSignup"
                    id="nationalId"
                    name="nationalid"
                    value={formData.nationalid}
                    onChange={handleChange}
                    placeholder="Enter your national ID number"
                    required
                  />
                </div>
                <div className="row mb-4">
                  <label htmlFor="district" className="Signup-label">
                    District
                  </label>
                  <Input
                    type="text"
                    className="form-control inputTypeSignup"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Enter your district"
                    required
                  />
                </div>
                <h4 className="mb-4 pb-2 pb-md-0 mb-md-3">Company details</h4>
                <div className="row mb-4">
                  <label htmlFor="companyName" className="Signup-label">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    className="form-control inputTypeSignup"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    required
                  />
                </div>
                <div className="row mb-4">
                  <label htmlFor="registrationNumber" className="Signup-label">
                    Registration Number
                  </label>
                  <Input
                    type="text"
                    className="form-control inputTypeSignup"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter your Company registration number"
                    required
                  />
                </div>
                <div className="row mb-4">
                  <label htmlFor="image" className="Signup-label">
                    Upload your Register certificate image
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="form-control inputTypeSignup"
                    id="image"
                    name="images"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <div className="row mb-4">
                  <div className="form-check d-flex justify-content-center mb-4 pb-3">
                    <Input
                      className="form-check-input me-3 border border-dark"
                      type="checkbox"
                      value=""
                      id="form2Example3c"
                    />
                    <label
                      className="form-check-label "
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

                <div className="row mt-4">
                  <div className="col-12 button-container">
                    <Input
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

export default Investor;

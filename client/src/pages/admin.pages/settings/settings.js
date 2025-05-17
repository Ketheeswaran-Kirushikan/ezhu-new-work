import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./setting.css";
import logo from "../../../assets/file(2).png";
import profile from "../../../assets/Group 29.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartLine,
  faTools,
  faSearch,
  faBell,
  faMessage,
  faBars,
  faSignOutAlt, // Added for logout icon
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate

const Settings = () => {
  const [formData, setFormData] = useState({
    adminName: "Kirushikan",
    email: "kirushikan@example.com",
    password: "",
    confirmPassword: "",
    notifications: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.adminName) {
      errors.adminName = "Admin name is required.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      errors.email = "Invalid email address.";
    }
    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Settings saved:", formData);
      // Add backend API call here (e.g., axios.post to update admin settings)
    }
  };

  const handleLogout = () => {
    // Clear authentication data (e.g., token)
    localStorage.removeItem("authToken"); // Adjust based on your auth setup
    // Navigate to homepage
    navigate("/");
  };

  return (
    <div>
      <input type="checkbox" id="nav-toggle" className="dashboard-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <img src={logo} alt="logo" className="sidebar-logo" />
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/dashboard" className="">
                <FontAwesomeIcon icon={faChartLine} />
                <span className="sidebar-span">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/skilledworkermanagement" className="">
                <FontAwesomeIcon icon={faUser} />
                <span className="sidebar-span">Skilled worker</span>
              </Link>
            </li>
            <li>
              <Link to="/investormanagement" className="">
                <FontAwesomeIcon icon={faUser} />
                <span className="sidebar-span">Investors</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="active">
                <FontAwesomeIcon icon={faTools} />
                <span className="sidebar-span">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <header>
          <label htmlFor="nav-toggle">
            <span>
              <FontAwesomeIcon icon={faBars} className="dashboard-icon" />
            </span>
          </label>
          <h2 className="text-white">Settings</h2>
          <div className="search-wrapper">
            <Input
              className="inputTypeSearch"
              placeholder="Search"
              id="Search"
              type="text"
            />
            <Button icon={faSearch} className="search-button dashboard-icon" />
          </div>
          <div className="dashboard-nav-icon">
            <Button icon={faBell} className="search-button dashboard-icon" />
          </div>
          <div className="dashboard-nav-icon">
            <Button icon={faMessage} className="search-button dashboard-icon" />
          </div>
          <div className="user-wrapper d-flex align-items-center">
            <div>
              <h4 className="text-white me-2">Kirushikan</h4>
            </div>
            <img src={profile} width="40px" height="40px" alt="profile-img" className="me-2" />
            <Button
              icon={faSignOutAlt}
              className="search-button dashboard-icon"
              onClick={handleLogout}
              title="Logout"
            />
          </div>
        </header>

        <main>
          <div className="row">
            <div className="col-md-12 mt-5">
              <h1 className="text-start text-white settings-title">Admin Settings</h1>
            </div>
          </div>
          <div className="row">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="settings-container">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="adminName" className="form-label">Admin Name</label>
                        <Input
                          type="text"
                          className="form-control"
                          id="adminName"
                          name="adminName"
                          value={formData.adminName}
                          onChange={handleChange}
                          placeholder="Enter admin name"
                        />
                        {formErrors.adminName && (
                          <div className="error-message">{formErrors.adminName}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <Input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                        />
                        {formErrors.email && (
                          <div className="error-message">{formErrors.email}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <Input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter new password"
                        />
                        {formErrors.password && (
                          <div className="error-message">{formErrors.password}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <Input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm new password"
                        />
                        {formErrors.confirmPassword && (
                          <div className="error-message">{formErrors.confirmPassword}</div>
                        )}
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="notifications"
                          name="notifications"
                          checked={formData.notifications}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="notifications">
                          Enable Email Notifications
                        </label>
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn btn-save"
                          name="Save Changes"
                          type="submit"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
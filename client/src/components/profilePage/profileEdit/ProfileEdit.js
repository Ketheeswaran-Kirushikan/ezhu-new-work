import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ProfileEidt.css";
import ProfileNavbar from "../profileNavbar/ProfileNavbar";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileAddPost from "../profile-add-post/ProfileAddPost";
import ProfileEditablePost from "../profile-post/ProfileEditablePost";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backendUrl from "../../../context/Config";

const ProfileEdit = () => {
  const location = useLocation();
  const { userData, token } = location.state || {};

  const [formData, setFormData] = useState({
    user_name: userData?.user_name || "",
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
    email: userData?.email || "",
    number: userData?.number || "",
    gender: userData?.gender || "",
    birthDate: userData?.birthDate || "",
    skill: userData?.skill || "",
    district: userData?.district || "",
    images: userData?.images || "", // Initialize images from userData if available
    password: "",
    bio: userData?.bio || "", // Initialize bio from userData if available
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCancel = () => {
    setFormData({
      user_name: userData?.user_name || "",
      first_name: userData?.first_name || "",
      last_name: userData?.last_name || "",
      email: userData?.email || "",
      number: userData?.number || "",
      gender: userData?.gender || "",
      birthDate: userData?.birthDate || "",
      skill: userData?.skill || "",
      district: userData?.district || "",
      images: userData?.images || "",
      password: "",
      bio: userData?.bio || "",
    });
    setIsEditing(false); // Close the edit mode
  };

  const validateForm = () => {
    setErrors({});
    return true; // Validation without confirm password
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const editedUser = { ...formData };

        const response = await axios.patch(
          `${backendUrl}/Ezhu/skilledworker/updateSkilledPerson/${userData._id}`,
          editedUser
        );
        if (response.status === 200) {
          toast.success("Update successful!");
          setIsEditing(false); // Close the edit mode
        } else {
          toast.error("Error updating user: " + response.statusText);
        }
      } catch (error) {
        toast.error("Error updating user: " + error.message);
      }
    }
  };

  const birthDate = new Date(userData.birthDate);

  // Format the date to a more readable format, e.g., "January 1, 2000"
  const formattedBirthDate = birthDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleEdit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(true);
    }, 2000);
  };

  if (!userData || !token) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ToastContainer />
      <ProfileNavbar userData={userData} token={token} style />
      <div className="container-fluid profile-side-bar">
        <div className="profile-management-side-bar-row">
          <div className="profile-page-management-side-bar col-2">
            <div className="profile-page-management-side-bar-image">
              <img
                src={userData.images}
                alt="Profile Image"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  objectPosition: "bottom",
                }}
              />
            </div>
            <div className="button-row">
              <button className="btn btn-primary" onClick={toggleEdit}>
                Edit Profile
              </button>
              <button className="btn btn-primary">Followers</button>
            </div>
            <div className="user-details-side-bar">
              <h4>Name: {userData.first_name}</h4>
              <p>Email: {userData.email}</p>
              <p>Location: {userData.district}</p>
              <p>Number: {userData.number}</p>
              <p>Birth Date: {formattedBirthDate}</p>
              <p>Bio: {userData.bio}</p>
            </div>
          </div>
          <div className="profile-page-management col-10">
            <div
              className={`profile-edit-container ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center mt-8">
                  <CircularProgress disableShrink />
                </div>
              ) : (
                isEditing && (
                  <form className="container mt-5" onSubmit={handleSubmit}>
                    <div className="row form-row">
                      <div className="form-group">
                        <label htmlFor="user_name">Username:</label>
                        <input
                          type="text"
                          id="user_name"
                          className="editable-username form-control profile-edit-input"
                          value={formData.user_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="first_name">First Name:</label>
                        <input
                          type="text"
                          id="first_name"
                          className="editable-firstname form-control profile-edit-input"
                          value={formData.first_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row form-row">
                      <div className="form-group">
                        <label htmlFor="last_name">Last Name:</label>
                        <input
                          type="text"
                          id="last_name"
                          className="editable-lastname form-control profile-edit-input"
                          value={formData.last_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="text"
                          id="email"
                          className="editable-email form-control profile-edit-input"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row form-row">
                      <div className="form-group">
                        <label htmlFor="number">Number:</label>
                        <input
                          type="text"
                          id="number"
                          className="editable-number form-control profile-edit-input"
                          value={formData.number}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <input
                          type="text"
                          id="gender"
                          className="editable-gender form-control profile-edit-input"
                          value={formData.gender}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row form-row">
                      <div className="form-group">
                        <label htmlFor="birthDate">Birth Date:</label>
                        <input
                          type="date"
                          id="birthDate"
                          className="editable-birthdate form-control profile-edit-input"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="skill">Skill:</label>
                        <input
                          type="text"
                          id="skill"
                          className="editable-skill form-control profile-edit-input"
                          value={formData.skill}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row form-row">
                      <div className="form-group">
                        <label htmlFor="district">District:</label>
                        <input
                          type="text"
                          id="district"
                          className="editable-district form-control profile-edit-input"
                          value={formData.district}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="images">Images:</label>
                        <input
                          type="file"
                          id="images"
                          className="editable-images form-control-file profile-edit-input"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              images: e.target.files[0],
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="row form-row">
                      <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                          type="password"
                          id="password"
                          className="editable-password form-control profile-edit-input"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="bio">Bio:</label>
                        <textarea
                          id="bio"
                          className="editable-bio form-control profile-edit-input"
                          value={formData.bio}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="button-row">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )
              )}
            </div>
            <ProfileAddPost userData={userData} token={token} />{" "}
            <ProfileEditablePost userData={userData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;

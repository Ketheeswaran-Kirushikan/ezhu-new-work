import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProfileEidt.css";
import ProfileNavbar from "../profileNavbar/ProfileNavbar";
// import ProfileEditablePost from "../profile-post/ProfileEditablePost";`

const ProfileView = () => {
  const location = useLocation();
  const { data, token } = location.state || {};

  const [loading, setLoading] = useState(false);

  const toggleEdit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (!data || !token) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <ProfileNavbar /> */}
      <div className="container-fluid profile-side-bar">
        <div className="profile-management-side-bar-row">
          <div className="profile-page-management-side-bar col-2">
            <div className="profile-page-management-side-bar-image">
              <img
                src={data.images}
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
              <h4>Name: {data.first_name}</h4>
              <p>Email: {data.email}</p>
              <p>Location: {data.district}</p>
              <p>Number: {data.number}</p>
              <p>
                Birth Date:{" "}
                {new Date(data.birthDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>Bio: {data.bio}</p>
            </div>
          </div>
          <div className="profile-page-management col-10">
            <div></div>
          </div>
        </div>
      </div>
      <div className="profile-add-post">{/* <ProfileEditablePost /> */}</div>
    </>
  );
};

export default ProfileView;

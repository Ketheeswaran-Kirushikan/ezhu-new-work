import React from "react";
import "./TopContainer.css";

const TopContainer = ({ userData }) => {
  const { first_name, images } = userData || {};
  return (
    <>
      <div className="container-xxl profile-top-container d-flex">
        <div className="flex-grow-1 profile-top-text-container">
          <h1>Welcome back , </h1>
          <h2>{first_name}</h2>
        </div>
        <div className="flex-grow-0 basis-3/7 profile-top-image-container">
          <img
            src={images}
            className="profile-top-image"
            alt="profilePic"
          ></img>
        </div>
      </div>
    </>
  );
};

export default TopContainer;

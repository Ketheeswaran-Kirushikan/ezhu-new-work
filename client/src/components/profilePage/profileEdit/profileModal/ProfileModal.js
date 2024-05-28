import React from "react";

const ProfileModal = ({ userData, token }) => {
  if (!userData) {
    return null; // Handle the case where userData is undefined
  }

  const { images } = userData;

  return (
    <div>
      <button
        className="btn btn-primary rounded-circle"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <img
          src={images}
          className="rounded-circle"
          height="50"
          alt="User Avatar"
          loading="lazy"
        />
      </button>
    </div>
  );
};

export default ProfileModal;

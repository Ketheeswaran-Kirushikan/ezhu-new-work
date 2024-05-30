import React from "react";
import ProfileNavbar from "../ProfileNavbar";

const BootCampNav = ({ userData, token }) => {
  return (
    <div>
      <ProfileNavbar userData={userData} token={token} />
    </div>
  );
};

export default BootCampNav;

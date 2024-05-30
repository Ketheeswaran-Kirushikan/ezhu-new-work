import React from "react";
import ProfileNavbar from "../ProfileNavbar";

const CommunityNav = ({ userData, token }) => {
  return (
    <div>
      <ProfileNavbar userData={userData} token={token} />
    </div>
  );
};

export default CommunityNav;

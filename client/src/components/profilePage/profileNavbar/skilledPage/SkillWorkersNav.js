import React from "react";
import ProfileNavbar from "../ProfileNavbar";

const SkillWorkersNav = ({ userData, token }) => {
  return (
    <div>
      <ProfileNavbar userData={userData} token={token} />
    </div>
  );
};

export default SkillWorkersNav;

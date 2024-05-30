import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileNavbar from "../../components/profilePage/profileNavbar/ProfileNavbar";
import TopContainer from "../../components/profilePage/top-container/TopContainer";
import ProfilePost from "../../components/profilePage/profile-post/ProfilePost";
import ProfileAddPost from "../../components/profilePage/profile-add-post/ProfileAddPost";
import ProfileRequestCards from "../../components/profilePage/profileCard/ProfileRequestCards";

const SkillWorkerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, token } = location.state || {};

  useEffect(() => {
    if (!userData || !token) {
      navigate("/login");
    }
  }, [userData, token, navigate]);

  if (!userData || !token) {
    return null;
  }

  return (
    <div>
      <ProfileNavbar userData={userData} token={token} />{" "}
      {/* Pass token to ProfileNavbar */}
      <div className="mt-8" style={{ marginTop: "180px" }}>
        <TopContainer userData={userData} />
        <ProfileAddPost userData={userData} token={token} />{" "}
        <ProfileRequestCards userData={userData} token={token} />
        {/* Pass token to ProfileAddPost */}
        <ProfilePost userData={userData} />
      </div>
    </div>
  );
};

export default SkillWorkerProfile;

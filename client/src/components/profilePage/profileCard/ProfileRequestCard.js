import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profileRequestCard.css";
import ProfileView from "../profileEdit/ProfileView";

const ProfileRequestCard = ({ data, token, id }) => {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userid = data._id;

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3002/Ezhu/follow/followRequest/${id}/${userid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Follow request sent:", response.data);
      setFollowed(true);
    } catch (err) {
      console.log("Error sending follow request:", err);
    }
  };

  const handleViewAndEditProfile = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/profileview", { state: { data, token } });
    }, 2000); // 2-second delay
  };

  return (
    <div className="request-card">
      <div className="image-request-person">
        <img
          src={data.images || "default-image-path"}
          className="card-img-top card-image-work"
          alt={`${data.first_name} ${data.last_name}`}
        />
      </div>
      <div className="card-body-request">
        <div>
          <h4>
            {data.first_name} {data.last_name}
          </h4>
        </div>
        <div>
          <button
            className="btn btn-primary follow-button"
            onClick={handleFollow}
            disabled={followed}
          >
            {followed ? "Request Sent" : "Follow"}
          </button>
          <button onClick={handleViewAndEditProfile}>
            {loading ? "Loading..." : "View Data"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileRequestCard;

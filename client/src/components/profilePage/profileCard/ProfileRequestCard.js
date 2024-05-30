import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profileRequestCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ProfileRequestCard = ({ data, token, id, userData }) => {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const userid = data._id;

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${process.env.BACK_END_URL}/follow/followRequest/${id}/${userid}`,
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
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
          <p className="mb-0">{data.role}</p>
        </div>
        <div className="button-follow">
          <button
            onClick={handleFollow}
            className="btn btn-primary follow-button"
            disabled={followed}
          >
            {followed ? "Followed" : "Follow"}
          </button>
          <button
            onClick={handleViewAndEditProfile}
            className="btn btn-outline-secondary follow-button"
          >
            View
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay modal-fullscreen">
          <div className="modal-content-request">
            <div className="close">
              <button className="close-button" onClick={closeModal}>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>
            <div className="profile-content">
              <div className="container-fluid border height-view">
                <div className="row">
                  <div className="col-sm-4 view-left">
                    <div className="row" id="firstRow">
                      <div className="view-head">
                        <h1>Profile Details</h1>
                      </div>
                    </div>
                    <div className="secondRow">
                      <label>Name: </label>
                      <p>
                        {data.first_name} {data.last_name}
                      </p>
                      <label>District: </label>
                      <p>{data.district}</p>
                      <label>Role: </label>
                      <p>{data.role}</p>
                      <label>Followers: </label>
                      <p>{data.followers.length}</p>
                      <label>Skill: </label>
                      <p>Handcraft Works</p>
                    </div>
                    <div className="botton-view-row">
                      <button
                        onClick={handleFollow}
                        className="btn btn-primary follow-button"
                        disabled={followed}
                      >
                        {followed ? "Followed" : "Follow"}
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-8 view-right">
                    <div className="image-view">
                      <img
                        src={data.images || "default-image-path"}
                        className="view-image-set"
                        alt={`${data.first_name} ${data.last_name}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileRequestCard;

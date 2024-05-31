import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profileRequestCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import backendUrl from "../../../context/Config";

const ProfileRequestCard = ({ data, token, id, userData, onFollowChange }) => {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const userid = data._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/Ezhu/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFollowed(response.data.followRequest.includes(userid));
      } catch (err) {
        console.log("Error fetching updated data:", err);
      }
    };
    fetchData();
  }, [followed, id, token, userid]);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${backendUrl}/Ezhu/follow/followRequest/${id}/${userid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowed(true);
      onFollowChange();
    } catch (err) {
      console.log("Error sending follow request:", err);
    }
    setLoading(false);
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
            disabled={followed || loading}
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
                          disabled={followed || loading}
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
    </div>
  );
};

export default ProfileRequestCard;

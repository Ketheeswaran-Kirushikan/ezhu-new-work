import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profilePost.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import backendUrl from "../../../context/Config";

const ProfilePost = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendUrl}/Ezhu/Post/postScroll`)
      .then((response) => {
        const { postDetails, userDetails } = response.data;
        setPosts(postDetails);
        if (userDetails && userDetails.length > 0) {
          setUsername(userDetails[0]);
        }
        console.log("Data fetched successfully");
        console.log(userDetails);
      })
      .catch((err) => {
        // setError("Error fetching data");
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="container mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      {posts.length === 0 ? (
        <div className="no-posts-message text-center">
          <p>Showcase your needs and thoughts</p>
        </div>
      ) : (
        username &&
        posts.map((post) => (
          <PostCard key={post._id} post={post} user={username} />
        ))
      )}
    </div>
  );
};

const PostCard = ({ post, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + "...";
  };

  const description = isExpanded
    ? post.description
    : truncateText(post.description, 100);

  return (
    <div className="card profile-card">
      <div className="card-body view-post-card">
        <div className="profile-card border-none">
          <div className="row top-profile-post-detail">
            <div className="col-6 float-left top-profile-post">
              <img
                src={user.images}
                className="profile-image"
                alt="profilePic"
              />
              <p className="top-profile-post-name">
                {user.first_name} {user.last_name}
              </p>
            </div>
            <div className="col-6 float-right top-profile-post-right">
              <i
                className="bi bi-three-dots-vertical"
                style={{ fontSize: "2rem", color: "currentColor" }}
              ></i>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="big-row">
                <img
                  src={post.post_image}
                  className="profile-card-image-view"
                  alt="Post Image"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="middle-row">
                <p
                  className={`view-card-text ${
                    isExpanded ? "expanded-text" : ""
                  }`}
                >
                  {description}
                </p>
                {post.description.length > 100 && (
                  <button
                    onClick={toggleText}
                    className="btn btn-link p-0 view-more-btn"
                  >
                    {isExpanded ? "View Less" : "View More"}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="small-row">
                <button type="button" className="btn mr-2">
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="2xl"
                    style={{ color: "#ed333b" }}
                  />
                </button>
                <button type="button" className="btn mr-2">
                  <FontAwesomeIcon icon={faComment} size="2xl" />
                </button>
                <button type="button" className="btn mr-2">
                  <FontAwesomeIcon icon={faMessage} size="2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profilePost.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { OverlayTrigger, Popover, Button } from "react-bootstrap"; // For popover
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
        console.log("Posts:", postDetails);
        if (userDetails && userDetails.length > 0) {
          setUsername(userDetails[0]);
        }
        console.log("Data fetched successfully");
        console.log("User Details:", userDetails);
      })
      .catch((err) => {
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
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    console.log(`Post ${post._id} ${isLiked ? "unliked" : "liked"}`);
    // Extend with API call: axios.post(`${backendUrl}/Ezhu/Post/${post._id}/like`)
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      console.log(`Comment on post ${post._id}: ${commentText}`);
      setCommentText("");
      setShowComment(false);
      // Extend with API call: axios.post(`${backendUrl}/Ezhu/Post/${post._id}/comment`, { text: commentText })
    }
  };

  const handleShare = () => {
    console.log(`Shared post ${post._id}`);
    // Extend with API call or share functionality (e.g., navigator.share)
  };

  const handlePopoverAction = (action) => {
    console.log(`Action on post ${post._id}: ${action}`);
    // Extend with API calls:
    // - Remove: axios.delete(`${backendUrl}/Ezhu/Post/${post._id}`)
    // - Hide: axios.post(`${backendUrl}/Ezhu/Post/${post._id}/hide`)
    // - Report: axios.post(`${backendUrl}/Ezhu/Post/${post._id}/report`)
  };

  const popover = (
    <Popover id="post-options-popover">
      <Popover.Body>
        <Button
          variant="link"
          className="d-block w-100 text-left p-0 mb-2"
          onClick={() => handlePopoverAction("Remove")}
        >
          Remove
        </Button>
        <Button
          variant="link"
          className="d-block w-100 text-left p-0 mb-2"
          onClick={() => handlePopoverAction("Hide")}
        >
          Hide
        </Button>
        <Button
          variant="link"
          className="d-block w-100 text-left p-0"
          onClick={() => handlePopoverAction("Report")}
        >
          Report
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="card profile-card"style={{ height: "50%" }}>
      <div className="card-body view-post-card" >
        <div className="profile-card border-none" style={{ height: "70%" }}>
          <div className="row top-profile-post-detail" style={{ height: "50%" }}>
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
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                rootClose
              >
                <i
                  className="bi bi-three-dots-vertical"
                  style={{ fontSize: "2rem", color: "currentColor", cursor: "pointer" }}
                ></i>
              </OverlayTrigger>
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
                <button type="button" className="btn mr-2" onClick={handleLike}>
                  <FontAwesomeIcon
                    icon={isLiked ? faHeartSolid : faHeartRegular}
                    size="2xl"
                    style={{ color: isLiked ? "#ed333b" : "#ed333b" }}
                  />
                  <span className="ms-1">{likeCount}</span>
                </button>
                <button
                  type="button"
                  className="btn mr-2"
                  onClick={() => setShowComment(!showComment)}
                >
                  <FontAwesomeIcon icon={faComment} size="2xl" />
                </button>
                <button type="button" className="btn mr-2" onClick={handleShare}>
                  <FontAwesomeIcon icon={faMessage} size="2xl" />
                </button>
              </div>
              {showComment && (
                <form onSubmit={handleCommentSubmit} className="mt-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      Post
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
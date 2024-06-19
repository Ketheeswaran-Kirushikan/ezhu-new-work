import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/file(2).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faMessage,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import ChatComponent from "../../Chat/ChatComponent";
import "./ProfileNavbar.css";
import NotificationOverlay from "../Notification/NotificationOverlay";
import ProfileModal from "../profileEdit/profileModal/ProfileModal";
import PaymentPop from "../profileNavbar/PaymentPop/PaymentPop"; // Import PaymentPop component
import axios from "axios";

const ProfileNavbar = ({ userData, token }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // State for payment modal

  const { _id, user_name, images } = userData || {};

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openChat = (e) => {
    e.preventDefault();
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:3002/Ezhu/logout`);
      localStorage.removeItem("token"); // Corrected localStorage key
      window.location.href = "/login"; // Redirect to the login page
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handlePaymentClick = (e) => {
    e.preventDefault();
    setShowPaymentModal(true); // Show the payment modal
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false); // Hide the payment modal
  };

  return (
    <div className="profile-nav-fixed">
      <div className="p-3 text-center profile-nav-background border-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 d-flex justify-content-center justify-content-md-start mb-1 mb-md-0">
              <Link to="/skillworkerprofile">
                <img src={logo} className="profile-nav-image" alt="MDB Logo" />
              </Link>
            </div>
            <div className="col-md-4 profile-nav-search">
              <form className="d-flex input-group my-auto">
                <input
                  autoComplete="off"
                  type="search"
                  className="form-control rounded profile-nav-input"
                  placeholder="Search"
                />
                <span className="input-group-text border-0 d-none d-lg-flex">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </form>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <div className="d-flex profile-nav-icons">
                <Link className="text-reset me-3" to="#" onClick={openChat}>
                  <span>
                    <FontAwesomeIcon icon={faMessage} />
                  </span>
                </Link>
                <span>
                  <NotificationOverlay userData={userData} token={token} />
                </span>
                <Link className="text-reset me-3" to="/cardForm">
                  <span>
                    <FontAwesomeIcon icon={faGlobe} />
                  </span>
                </Link>
                <div className="d-flex align-items-center profile-nav-name">
                  <Link
                    className="text-reset me-3"
                    to="/profileedit"
                    state={{ userData, token }}
                  >
                    <span>
                      <p className="m-0">{user_name}</p>
                    </span>
                  </Link>
                  <ProfileModal userData={userData} token={token} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary border-bottom">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarCenteredExample"
            aria-controls="navbarCenteredExample"
            aria-expanded={!isCollapsed ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleCollapse}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div
            className={`collapse navbar-collapse justify-content-center ${
              !isCollapsed ? "show" : ""
            }`}
            id="navbarCenteredExample"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item profile-nav-item">
                <Link className="nav-link" to="/community" state={{ _id }}>
                  Community
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/investorsNav?userId=${userData._id}&token=${token}`}
                >
                  Investors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/skillworkerNav"
                  state={{ userData, token }}
                >
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/bootcamps"
                  state={{ userData, token }}
                >
                  Work shop
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ChatComponent
        isChatOpen={isChatOpen}
        closeChat={closeChat}
        userId={_id}
        userName={user_name}
        userImage={images}
        userToken={token}
      />

      <div
        className="offcanvas offcanvas-end profile-edit-canvas"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header profile-edit-canvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <div className="canvas-header-container">
            <img
              src={images}
              className="rounded-circle"
              height="80"
              alt="User Avatar"
              loading="lazy"
            />
            <h5 id="offcanvasRightLabel" className="canvas-font">
              {user_name}
            </h5>
          </div>
        </div>
        <div className="offcanvas-body profile-offcanvas-body">
          <ul className="profile-offcanvas-list">
            <li className="profile-offcanvas-item">
              <Link to="/profileedit" state={{ userData, token }}>
                Profile management
              </Link>
            </li>
            <li className="profile-offcanvas-item">
              <Link to="#" onClick={handlePaymentClick}>
                {" "}
                {/* Trigger modal */}
                Payment
              </Link>
            </li>
            <li className="profile-offcanvas-item">
              <Link to="/followers" state={{ userData, token }}>
                Followers
              </Link>
            </li>
            <li className="profile-offcanvas-item">
              <Link to="/following-request">Following Request</Link>
            </li>
            <li className="profile-offcanvas-item">
              <Link to="/settings">Settings</Link>
            </li>
            <li className="profile-offcanvas-item">
              <button onClick={handleLogout} className="logOut-button-canvas">
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>

      <PaymentPop
        show={showPaymentModal}
        handleClose={handleClosePaymentModal}
      />
    </div>
  );
};

export default ProfileNavbar;

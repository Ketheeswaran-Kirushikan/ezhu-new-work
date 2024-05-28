import React, { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./notification.css";
import { Link } from "react-router-dom";
import axios from "axios";

function NotificationOverlay({ userData, token }) {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/Ezhu/follow/followersRequests/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPersons(response.data);
        console.log("Fetched persons:", response.data);
      } catch (err) {
        console.log("Error fetching data:", err.message);
      }
    };

    fetchPersons();
  }, [userData._id, token]);

  const handleFollow = async (personId) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/Ezhu/follow/followersChange/${userData._id}/${personId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Follow Approved:", response.data);

      // Update the local state
      setPersons((prevPersons) =>
        prevPersons.map((person) =>
          person._id === personId
            ? { ...person, followRequest: false, followers: true }
            : person
        )
      );
    } catch (err) {
      console.log("Error approving follow request:", err.message);
    }
  };

  const handleDelete = async (personId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/Ezhu/follow/followersDelete/${userData._id}/${personId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Follow Delete:", response.data);

      // Update the local state
      setPersons((prevPersons) =>
        prevPersons.map((person) =>
          person._id === personId
            ? { ...person, followRequest: false, followers: true }
            : person
        )
      );
    } catch (err) {
      console.log("Error deleting follow request:", err.message);
    }
  };

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover
            id="popover-positioned-bottom"
            className="Notify-pops"
            style={{ width: "500px" }}
          >
            <Popover.Header as="h3">Notifications</Popover.Header>
            <Popover.Body className="follow-container">
              {persons.length > 0 ? (
                persons.map((person) => (
                  <div className="Notification-pops" key={person._id}>
                    <div className="image-notification">
                      <Link
                        to={`/profile/${person._id}`}
                        state={{ userData, token }}
                        className="btn btn-link p-0"
                      >
                        <img
                          src={person.images || "/default_image_url"}
                          className="rounded-circle"
                          height="30"
                          alt="User Avatar"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <div>
                      <p className="follower-name">{person.first_name}</p>
                      <p className="follow-text">He sent a request</p>
                    </div>
                    <div className="follow-icon-container">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size="2x"
                        style={{ color: "#57e389", cursor: "pointer" }}
                        onClick={() => handleFollow(person._id)}
                      />
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        size="2xl"
                        style={{ color: "#e01b24", cursor: "pointer" }}
                        onClick={() => handleDelete(person._id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No new notifications</p>
              )}
            </Popover.Body>
          </Popover>
        }
      >
        <span>
          <FontAwesomeIcon icon={faBell} />
        </span>
      </OverlayTrigger>
    </>
  );
}

export default NotificationOverlay;

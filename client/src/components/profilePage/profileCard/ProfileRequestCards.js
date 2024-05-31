import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProfileRequestCard from "./ProfileRequestCard";
import "./profileRequestCard.css";
import backendUrl from "../../../context/Config";

const ProfileRequestCards = ({ token, userData }) => {
  const [unfollowedUsers, setUnfollowedUsers] = useState([]);
  const [followed, setFollowed] = useState(false);
  const cardFlowRef = useRef(null);

  const fetchUnfollowedUsers = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/Ezhu/follow/followers/${userData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUnfollowedUsers(response.data.unfollowedUsers);
      console.log("Fetched unfollowed users:", response.data.unfollowedUsers);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchUnfollowedUsers();
  }, [userData._id, token, followed]); // Re-fetch when followed state changes

  useEffect(() => {
    const handleWheel = (event) => {
      if (cardFlowRef.current) {
        if (event.deltaY !== 0) {
          event.preventDefault();
          cardFlowRef.current.scrollLeft += event.deltaY;
        }
      }
    };

    const cardFlowElement = cardFlowRef.current;
    if (cardFlowElement) {
      cardFlowElement.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (cardFlowElement) {
        cardFlowElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleFollowChange = () => {
    setFollowed(!followed); // Toggle followed state to trigger re-fetch
  };

  return (
    <>
      <h3 className="follow-head">Recommended for you</h3>
      <div className="card-flow" ref={cardFlowRef}>
        {unfollowedUsers.length > 0 ? (
          unfollowedUsers.map((person) => (
            <ProfileRequestCard
              key={person._id}
              data={person}
              token={token}
              id={userData._id}
              userData={userData}
              onFollowChange={handleFollowChange} // Pass the callback
            />
          ))
        ) : (
          <p>No skilled persons found.</p>
        )}
      </div>
    </>
  );
};

export default ProfileRequestCards;

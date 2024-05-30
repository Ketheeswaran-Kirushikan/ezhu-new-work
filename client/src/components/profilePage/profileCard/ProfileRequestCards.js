import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProfileRequestCard from "./ProfileRequestCard";
import "./profileRequestCard.css";
import backendUrl from "../../../context/Config";

const ProfileRequestCards = ({ token, userData }) => {
  const [persons, setPersons] = useState([]);
  const cardFlowRef = useRef(null);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/Ezhu/follow/followers/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
            },
          }
        );
        setPersons(response.data);
        console.log("Fetched persons:", response.data); // Log the fetched data
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchPersons();
  }, [userData._id, token]); // Use userData._id instead of _id

  useEffect(() => {
    const handleWheel = (event) => {
      if (cardFlowRef.current) {
        if (event.deltaY !== 0) {
          event.preventDefault(); // Prevent vertical scrolling
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

  return (
    <>
      <h3>Recomanded you</h3>
      <div className="card-flow" ref={cardFlowRef}>
        {persons.length > 0 ? (
          persons.map((person) => (
            <ProfileRequestCard
              key={person._id}
              data={person}
              token={token}
              id={userData._id}
              userData={userData} // Corrected prop name to id
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

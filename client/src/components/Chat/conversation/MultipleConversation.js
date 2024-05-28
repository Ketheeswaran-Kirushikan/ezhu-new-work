import React, { useState, useEffect } from "react";
import axios from "axios";
import Conversation from "./Conversation";

const MultipleConversations = ({ _id, token }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/Ezhu/chat/getuser/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
            },
          }
        );
        setConversations(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchConversations();
  }, [_id, token]);

  return (
    <>
      {conversations.length > 0 ? (
        conversations.map((conversation, index) => {
          console.log("Conversation:", conversation); // Print each conversation separately
          return (
            <Conversation
              key={conversation._id}
              data={conversation}
              lastIndex={index === conversations.length - 1}
            />
          );
        })
      ) : (
        <p>No conversations found.</p>
      )}
    </>
  );
};

export default MultipleConversations;

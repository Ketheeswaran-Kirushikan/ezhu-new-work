import React, { useState, useEffect } from "react";
import axios from "axios";

const UserGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3002/Ezhu/chat/getuser`
        );
        const data = response.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    getConversation();
  }, []);

  return { loading, conversations }; // Return loading state and conversations as an object
};

export default UserGetConversation;

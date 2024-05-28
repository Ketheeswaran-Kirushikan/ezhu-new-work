import React, { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../../../store/useConversation";
import Message from "./Message";
import "./Message.css";

const Messages = ({ token, _id, images, user_name }) => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages, messages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3002/Ezhu/chat/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data;
        console.log(res.data);
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages, token]);

  return (
    <div className="messages-container">
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>Send a message to start the new conversation</p>
      ) : (
        messages.map((message) => (
          <Message
            key={message._id}
            message={message}
            token={token}
            _id={_id}
            images={images}
            user_name={user_name}
          />
        ))
      )}
    </div>
  );
};

export default Messages;

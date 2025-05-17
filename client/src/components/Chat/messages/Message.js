import React from "react";
import "./Message.css"; // Import the CSS file
import Avatar from "@mui/material/Avatar";
import useConversation from "../../../store/useConversation";


const Message = ({ message, token, images, user_name, _id }) => {
  const { selectedConversation } = useConversation();
  const fromMe = message.sender_id === _id;
  const chatContainerClassName = fromMe
    ? "chat-container-me"
    : "chat-container-them";
  const chatBubbleClassName = fromMe ? "chat-bubble-me" : "chat-bubble-them";
  const profilePicture = fromMe ? images : selectedConversation?.images || "/default_image_url";
  const bubbleBgColor = fromMe ? "#8eb9fa" : "rgba(0, 0, 0, 0.05)";

  const getFormattedTime = () => {
    try {
      const date = new Date(message.createdAt);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch (error) {
      console.error("Error formatting time:", error, "Message:", message);
      return "Just now";
    }
  };

  return (
    <div className={chatContainerClassName}>
      <div
        className={chatBubbleClassName}
        style={{ backgroundColor: bubbleBgColor }}
      >
        {message.message}
      </div>
      <div className="chat-time">{getFormattedTime()}</div>
      <Avatar alt={fromMe ? "You" : user_name} src={profilePicture} />
    </div>
  );
};

export default Message;
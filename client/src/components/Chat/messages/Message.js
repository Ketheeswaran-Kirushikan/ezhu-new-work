import React from "react";
import "./Message.css"; // Import the CSS file
import Avatar from "@mui/material/Avatar";
import useConversation from "../../../store/useConversation";

const Message = ({ message, token, images, user_name, _id }) => {
  const { selectedConversation } = useConversation();
  const fromMe = message.sender_id === _id; // Check if the message was sent by the current user
  const chatContainerClassName = fromMe
    ? "chat-container-me"
    : "chat-container-them"; // Toggle chat container class
  const chatBubbleClassName = fromMe ? "chat-bubble-me" : "chat-bubble-them"; // Toggle chat bubble class
  const profilePicture = fromMe ? images : selectedConversation.images;
  const bubbleBgColor = fromMe ? "#8eb9fa" : "rgba(0, 0, 0, 0.05)";

  const getFormattedTime = () => {
    const date = new Date(message.createdAt); // Use the message's createdAt timestamp
    const hours = date.getHours().toString().padStart(2, "0"); // Add leading zero
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero
    return `${hours}:${minutes}`;
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

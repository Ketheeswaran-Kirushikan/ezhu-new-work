import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import "./conversation.css";
import useConversation from "../../../store/useConversation";
import { SocketContext } from "../../../context/SocketProvider";

const Conversation = ({ data }) => {
  const { message, images, user_name, _id } = data;
  const { selectedConversation, setSelectedConversation } = useConversation(
    (state) => ({
      selectedConversation: state.selectedConversation,
      setSelectedConversation: state.setSelectedConversation,
    })
  );

  const isSelected = selectedConversation?._id === _id;
  const { onlineUsers, userSocketMap } = useContext(SocketContext);

  const isOnline = userSocketMap[_id] || false; // Check if userSocketMap contains the user's socket ID

  // Log isOnline status for debugging
  console.log("Is User Online?", isOnline);

  return (
    <div
      className={`conversation-item d-flex align-items-center border-bottom py-2 px-3 
      ${isSelected ? "selected-conversation" : ""}`}
      onClick={() => setSelectedConversation(data)}
    >
      <Avatar alt={user_name} src={images} />
      <div className="conversation-content ms-3">
        <h6 className="conversation-name mb-0">{user_name}</h6>
        <p className="conversation-message text-muted mb-0">{message}</p>
        <span className={`online-status ${isOnline ? "online" : "offline"}`}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default Conversation;

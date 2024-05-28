import React from "react";
import Avatar from "@mui/material/Avatar";
import "./conversation.css";
import useConversation from "../../../store/useConversation";

const Conversation = ({ data }) => {
  const { message, images, user_name, _id } = data;
  const { selectedConversation, setSelectedConversation } = useConversation(
    (state) => ({
      selectedConversation: state.selectedConversation,
      setSelectedConversation: state.setSelectedConversation,
    })
  );
  const isSelected = selectedConversation?._id === _id;

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
      </div>
    </div>
  );
};

export default Conversation;

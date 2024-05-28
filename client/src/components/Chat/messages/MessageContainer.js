import React, { useEffect } from "react";
import Messages from "./Messages";
import Avatar from "@mui/material/Avatar";
import ChatMessageInput from "../chatMessage/ChatMessageInput";
import useConversation from "../../../store/useConversation";

const MessageContainer = ({ token, _id, images, user_name }) => {
  // const noChatSelected = true;
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    //clean up process
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="chat-section mb-0 chat-section-color d-flex align-items-center">
            <Avatar
              alt="Remy Sharp"
              src={selectedConversation.images}
              className="me-2"
            />
            <h5 className="mb-0">{selectedConversation.user_name}</h5>
          </div>
          <Messages
            token={token}
            _id={_id}
            images={images}
            user_name={user_name}
          />
          <ChatMessageInput token={token} _id={_id} />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="text-center mt-5">
      <h4>No chat selected</h4>
    </div>
  );
};

export { NoChatSelected };

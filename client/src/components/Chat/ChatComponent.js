import React from "react";
import "./chatcomponent.css"; // Assuming you have a CSS file for styling
import ChatSearch from "./chatSearch/ChatSearch";
import MultipleConversation from "./conversation/MultipleConversation";
import MessageContainer from "./messages/MessageContainer";

const ChatComponent = ({
  isChatOpen,
  closeChat,
  userId,
  userImage,
  userName,
  userToken,
}) => {
  console.log(userId);
  return (
    <div
      className={`offcanvas offcanvas-start ${isChatOpen ? "show" : ""}`}
      tabIndex="-1"
      aria-labelledby="offcanvasWithBackdropLabel"
      style={{ visibility: isChatOpen ? "visible" : "hidden" }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
          Chat
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          aria-label="Close"
          onClick={closeChat}
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="chat-sidebar">
                <ChatSearch
                  images={userImage}
                  _id={userId}
                  user_name={userName}
                  token={userToken}
                />
                <MultipleConversation
                  images={userImage}
                  _id={userId}
                  user_name={userName}
                  token={userToken}
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="chat-main">
                <div className="row chat-main-section">
                  <div className="col-12 ">
                    <MessageContainer
                      images={userImage}
                      _id={userId}
                      user_name={userName}
                      token={userToken}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;

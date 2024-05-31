import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./chatinput.css";
import useConversation from "../../../store/useConversation";
import axios from "axios";
import backendUrl from "../../../context/Config";

const ChatMessageInput = ({ token, _id }) => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages, messages } = useConversation();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted message:", message);

    const sendMessage = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${backendUrl}/Ezhu/chat/sendmessage/${selectedConversation._id}`,
          { message },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response:", res.data);

        // Update local messages state with new message details
        setMessages([...messages, res.data]);
      } catch (error) {
        console.error("Error sending message:", error);
        console.error("Response data:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    await sendMessage();
    setMessage(""); // Clear message after sending
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex align-items-center border-top mt-3 chatInput"
    >
      <input
        type="text"
        className="form-control flex-grow-1 py-3 px-4 chat-input-text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="btn btn-primary rounded-circle chatSendButton"
        disabled={loading}
      >
        <FontAwesomeIcon icon={faPaperPlane} className="my-icon" />
      </button>
    </form>
  );
};

export default ChatMessageInput;

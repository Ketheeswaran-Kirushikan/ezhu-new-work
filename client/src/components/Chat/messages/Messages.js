import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useConversation from "../../../store/useConversation";
import Message from "./Message";
import "./Message.css";
import useListenMessages from "../../hooks/useListenMessages";
import backendUrl from "../../../context/Config";

const Messages = ({ token, _id, images, user_name }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedConversation, setMessages, messages } = useConversation();
  const lastMessageRef = useRef(null);
  useListenMessages();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${backendUrl}/Ezhu/chat/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();

    return () => {
      setMessages([]);
      setError(null);
    };
  }, [selectedConversation?._id, setMessages, token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages.length]);

  let content;
  if (loading) {
    content = <p>Loading messages...</p>;
  } else if (error) {
    content = <p>Error loading messages. Please try again.</p>;
  } else if (messages.length === 0) {
    content = <p>Send a message to start the new conversation</p>;
  } else {
    content = (
      <>
        {messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message
              message={message}
              token={token}
              _id={_id}
              images={images}
              user_name={user_name}
            />
          </div>
        ))}
      </>
    );
  }

  return <div className="messages-container">{content}</div>;
};

export default Messages;

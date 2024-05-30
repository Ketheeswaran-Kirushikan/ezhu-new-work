import React, { useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketProvider";
import useConversation from "../hooks/useGetConversation"; // Assuming useConversation hook is properly defined

const useListenMessages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, setMessages]);

  return { messages, setMessages };
};

export default useListenMessages;

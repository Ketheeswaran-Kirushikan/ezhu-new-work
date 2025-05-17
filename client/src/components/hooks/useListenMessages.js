import { useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketProvider";
import useConversation from "../hooks/useGetConversation"; // Assuming useConversation hook is properly defined
const useListenMessages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) {
      console.log("Socket not available in useListenMessages");
      return;
    }

    const handleNewMessage = (newMessage) => {
      console.log("New message received:", newMessage);
      console.log("Current selected conversation:", selectedConversation);
      console.log("Current messages:", messages);

      if (
        selectedConversation &&
        (newMessage.sender_id === selectedConversation._id ||
         newMessage.receiver_id === selectedConversation._id)
      ) {
        const messageExists = messages.some((msg) => msg._id === newMessage._id);
        if (!messageExists) {
          setMessages([...messages, newMessage]);
          console.log("Updated messages:", [...messages, newMessage]);
        } else {
          console.log("Message already exists in state:", newMessage);
        }
      } else {
        console.log("Message not for current conversation");
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, setMessages, selectedConversation]);

  return { messages, setMessages };
};

export default useListenMessages;
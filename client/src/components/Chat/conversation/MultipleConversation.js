import React from "react";
import Conversation from "./Conversation"; // Make sure to import Conversation if it's needed
import useGetConversation from "../../hooks/useGetConversation";

const MultipleConversations = ({ _id, token }) => {
  const { loading, conversation } = useGetConversation(_id, token);
  console.log("Conver", conversation);

  return (
    <>
      {conversation.length > 0 ? (
        conversation.map((conversationItem, index) => {
          console.log("Conversation:", conversationItem); // Print each conversation separately
          return (
            <Conversation
              key={conversationItem._id}
              data={conversationItem}
              lastIndex={index === conversation.length - 1}
            />
          );
        })
      ) : (
        <p>No conversations found.</p>
      )}
    </>
  );
};

export default MultipleConversations;

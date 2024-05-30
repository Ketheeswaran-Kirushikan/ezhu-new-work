import React, { useState } from "react";
import useConversation from "../../../store/useConversation";
import useGetConversation from "../../hooks/useGetConversation";

const ChatSearch = ({ _id, token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversation } = useGetConversation(_id, token);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm) return;
    if (searchTerm.length < 3) {
      alert("Please enter at least 3 characters for search");
      return;
    }
    const foundConversation = conversation.find(
      (c) =>
        c.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundConversation) {
      setSelectedConversation(foundConversation);
      setSearchTerm("");
      console.log("Conversation found and selected:", foundConversation);
    } else {
      alert("No conversation found");
    }
  };

  return (
    <form
      className="chat-search d-flex align-items-center mb-4"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        className="form-control rounded-pill border-0 py-2 px-3 shadow-sm"
        placeholder="Search for messages or users"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-primary ms-2 rounded-pill">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default ChatSearch;

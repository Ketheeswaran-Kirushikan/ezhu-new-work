import React from "react";

const ChatSearch = () => {
  return (
    <div className="chat-search d-flex align-items-center mb-4">
      <input
        type="search"
        className="form-control rounded-pill border-0 py-2 px-3 shadow-sm"
        placeholder="Search for messages or users"
        aria-label="Search"
      />
      <button className="btn btn-primary ms-2 rounded-pill">
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
};

export default ChatSearch;

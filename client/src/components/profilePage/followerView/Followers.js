import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./followers.css";
import Chat from "../../Chat/ChatComponent"; // Import the Chat component
import backendUrl from "../../../context/Config";

const Followers = () => {
  const location = useLocation();
  const { userData, token } = location.state || {};
  const [skilledPersons, setSkilledPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null); // State to track selected person

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${backendUrl}/Ezhu/follow/getfollowers/${userData._id}`)
      .then((response) => setSkilledPersons(response.data))
      .catch((err) => console.log(err));
  };

  const handleStartChat = (senderId, receiverId, receiverName) => {
    // Set the selected person when Message button is clicked
    setSelectedPerson({ senderId, receiverId, receiverName });
  };

  return (
    <div>
      {selectedPerson && ( // Render the Chat component if a person is selected
        <Chat
          senderId={selectedPerson.senderId}
          receiverId={selectedPerson.receiverId}
          receiverName={selectedPerson.receiverName}
        />
      )}
      <div className="table-wrapper container-fluid">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Message</th>
              <th>Unfollow</th>
            </tr>
          </thead>
          <tbody>
            {skilledPersons.map((person) => (
              <tr key={person._id}>
                <td>{person.first_name}</td>
                <td>{person.role}</td>
                <td>
                  {/* Pass person's details to handleStartChat */}
                  <button
                    className="message-btn btn-1"
                    onClick={() =>
                      handleStartChat(
                        userData._id,
                        person._id,
                        person.first_name,
                        token
                      )
                    }
                  >
                    Message
                  </button>
                </td>
                <td>
                  <button className="unfollow-btn btn-2">Unfollow</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Followers;

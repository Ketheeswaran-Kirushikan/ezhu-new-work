import React, { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userSocketMap, setUserSocketMap] = useState({});
  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  useEffect(() => {
    console.log("User ID:", userId); // Log userId for testing

    const newSocket = socketIOClient(`${process.env.BACK_END_URL}`, {
      withCredentials: true,
      query: { userId },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected:", newSocket.id);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId]); // Include userId in the dependency array

  useEffect(() => {
    if (socket) {
      socket.on("getAllUsers", (users) => {
        console.log("All users:", users);
        setOnlineUsers(users);
        const newUserSocketMap = {};
        users.forEach((userId) => {
          newUserSocketMap[userId] = true;
        });
        setUserSocketMap(newUserSocketMap);
      });

      socket.on("disconnectUser", (userId) => {
        const newUserSocketMap = { ...userSocketMap };
        delete newUserSocketMap[userId];
        setOnlineUsers(Object.keys(newUserSocketMap));
        setUserSocketMap(newUserSocketMap);
      });
    }
  }, [socket, userSocketMap]);

  useEffect(() => {
    console.log("Online Users:", onlineUsers);
    console.log("User Socket Map:", userSocketMap);
  }, [onlineUsers, userSocketMap]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, userSocketMap }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

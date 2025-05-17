import React, { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import backendUrl from "../context/Config";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userSocketMap, setUserSocketMap] = useState({});
  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  useEffect(() => {

    const newSocket = socketIOClient(backendUrl, {
      withCredentials: true,
      query: { userId },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
    });

    newSocket.on("connect_error", (error) => {
    });

    newSocket.on("disconnect", () => {

    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (socket) {
      socket.on("getAllUsers", (users) => {
        setOnlineUsers(users);
        const newUserSocketMap = {};
        users.forEach((userId) => {
          newUserSocketMap[userId] = true;
        });
        setUserSocketMap(newUserSocketMap);
      });

      socket.on("disconnectUser", (disconnectedUserId) => {
        const newUserSocketMap = { ...userSocketMap };
        delete newUserSocketMap[disconnectedUserId];
        setOnlineUsers(Object.keys(newUserSocketMap));
        setUserSocketMap(newUserSocketMap);
      });
    }
  }, [socket, userSocketMap]);

  useEffect(() => {
  }, [onlineUsers, userSocketMap]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, userSocketMap }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
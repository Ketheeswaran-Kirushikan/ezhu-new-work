const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://ezhu-new-work.vercel.app",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

const getReciverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId !== undefined && userId !== null) {
    // Check for valid userId
    if (userSocketMap[userId]) {
      // User already has a socket ID assigned, update it
      userSocketMap[userId] = socket.id;
    } else {
      // Add new user to userSocketMap
      userSocketMap[userId] = socket.id;
    }

    // Emit to all connected clients
    io.emit("getAllUsers", Object.keys(userSocketMap));
    console.log("Emitted getAllUsers to all clients:", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    const userId = Object.keys(userSocketMap).find(
      (id) => userSocketMap[id] === socket.id
    );

    if (userId) {
      delete userSocketMap[userId];

      // Emit to all connected clients
      io.emit("disconnectUser", userId);
      console.log("Emitted disconnectUser to all clients:", userId);

      // Update all clients with the new list of online users
      io.emit("getAllUsers", Object.keys(userSocketMap));
      console.log("Emitted updated getAllUsers to all clients:", Object.keys(userSocketMap));
    }
  });
});

module.exports = { app, server, io, getReciverSocketId };
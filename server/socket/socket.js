const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  console.log("User Connected:", socket.id);

  const userId = socket.handshake.query.uId;
  console.log("User ID:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));
  console.log("Online Users:", userSocketMap);

  
  socket.on('disconnect', () => {
    console.log("User Disconnected:", socket.id);

    
    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    console.log("Updated Online Users:", userSocketMap);
  });
});

module.exports = { io, server, app, getReceiverSocketId };

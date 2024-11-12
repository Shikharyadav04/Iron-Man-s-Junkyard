import { Server } from "socket.io";

let io;

export const setSocket = (socketIoInstance) => {
  io = socketIoInstance;

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("sendMessage", ({ chatId, message, senderId }) => {
      io.to(chatId).emit("newMessage", {
        senderId,
        message,
        timestamp: new Date(),
        senderName,
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export const getIo = () => io;

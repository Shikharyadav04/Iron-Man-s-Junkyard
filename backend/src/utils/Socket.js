import { Chat } from "../models/chat.models.js";

export const setSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected to ${socket.id}`);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });

    socket.on("sendMessage", async ({ roomId, senderId, message }) => {
      const chat = await Chat.findOne({ requestId: roomId });

      if (!chat) return;

      const newMessage = {
        senderId,
        content: message,
        timestamp: new Date(),
      };

      chat.messages.push(newMessage);

      await chat.save();

      io.to(roomId).emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected :  ${socket.id}`);
    });
  });
};

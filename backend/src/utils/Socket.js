import { Chat } from "../models/chat.models.js";

let io; // Declare io globally

export const setSocket = (socketIoInstance) => {
  io = socketIoInstance; // Set the io instance globally

  io.on("connection", (socket) => {
    console.log(`User connected to ${socket.id}`);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });

    socket.on("sendMessage", async ({ roomId, senderId, content }) => {
      const chat = await Chat.findOne({ requestId: roomId });

      if (!chat) return;

      const newMessage = {
        senderId,
        content, // Ensure 'content' is set correctly
        timestamp: new Date(),
      };

      // Ensure the content array exists
      if (!chat.content) {
        chat.content = []; // Create content array if it doesn't exist
      }

      chat.content.push(newMessage); // Push to "content" array in schema

      await chat.save();

      io.to(roomId).emit("receiveMessage", newMessage); // Emit to room
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected :  ${socket.id}`);
    });
  });
};

// Create a getter for the io instance
export const getIo = () => io;

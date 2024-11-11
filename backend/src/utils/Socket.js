import { Server } from "socket.io"; // Import the Server from socket.io

let io; // Declare io variable globally

export const setSocket = (socketIoInstance) => {
  io = socketIoInstance; // Set the io instance when calling setSocket

  io.on("connection", (socket) => {
    console.log(`User connected to socket with ID: ${socket.id}`);

    socket.on("joinRoom", (roomId) => {
      console.log(`User ${socket.id} attempting to join room ${roomId}`);
      socket.join(roomId);
      console.log(`User ${socket.id} successfully joined room ${roomId}`);
    });

    socket.on("sendMessage", async ({ chatId, message, senderId }) => {
      console.log(
        `Message received for chatId ${chatId} from sender ${senderId}: ${message}`
      );
      io.to(chatId).emit("newMessage", { senderId, message });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected with ID: ${socket.id}`);
    });
  });
};

export const getIo = () => io; // Return the io instance when needed

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { Server } from "socket.io";
import http from "http";
import { setSocket } from "./utils/Socket.js";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5175",
        credentials: true,
        methods: ["GET", "POST"],
      },
    });

    setSocket(io);

    server.on("error", (err) => {
      console.error(`Server Error: ${err.message}`);
      process.exit(1);
    });

    server.listen(port, () => {
      console.log(`Listening on port :  ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed ", error);
  });

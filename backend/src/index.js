import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// configuring dotenv

dotenv.config({
  path: "./.env",
});

// connecting database

const port = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error(`Server Error: ${err.message}`);
      process.exit(1);
    });

    app.listen(port, () => {
      console.log(`Listening on port :  ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed ", error);
  });
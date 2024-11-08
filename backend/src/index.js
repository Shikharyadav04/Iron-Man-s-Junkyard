import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { User } from "./models/user.models.js";
// configuring dotenv

dotenv.config({
  path: "./.env",
});

// connecting database
const fun = async () => {
  const user = await User.findOne({ email: "shikhar645@gmail.com" });
  if (!user) console.log("user not found");
  console.log("User found directly with email:", user);
};
fun();

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

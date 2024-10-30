import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Optionally customize file naming
  },
});

// Initialize multer with storage settings
export const upload = multer({
  storage,
});

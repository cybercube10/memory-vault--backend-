// middleware/fileUpload.js

const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name conflicts
  },
});

// Initialize multer with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;

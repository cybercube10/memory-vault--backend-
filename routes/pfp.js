// profilePictureUpload.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const Profile = require('../model/profile'); // Import Profile model
const User = require('../model/user'); // Import User model
const middleware = require('../middleware');

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_pics');
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Route for profile picture upload
router.post('/upload-profile-pic', middleware, upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imageUrl = `http://localhost:3000/uploads/profile_pics/${req.file.filename}`;
    const userId = req.user.id;  // Extract user ID from the JWT payload

    // Check if a profile exists for the user, if not, create one
    let profile = await Profile.findOne({ userId });

    if (profile) {
      // Update the profile with the new image URL
      profile.profilePicture = imageUrl;
    } else {
      // Create a new profile if it doesn't exist
      profile = new Profile({
        userId,
        profilePicture: imageUrl,
      });
    }

    await profile.save(); // Save the profile to the database

    // Respond with the new image URL
    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



router.get('/profile-pic', middleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    
    if (!profile || !profile.profilePicture) {
      return res.status(404).json({ 
        success: false, 
        message: 'No profile picture found' 
      });
    }

    res.json({ 
      success: true, 
      profilePicture: profile.profilePicture 
    });
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});


module.exports = router;

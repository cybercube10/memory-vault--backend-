const jwt = require('jsonwebtoken');
const User = require('./model/user');
require('dotenv').config();

const middleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Find user from the decoded token's ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'No user found' });
    }

    // Add user info to the request object
    req.user = { name: user.name, id: user._id };

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = middleware;
 
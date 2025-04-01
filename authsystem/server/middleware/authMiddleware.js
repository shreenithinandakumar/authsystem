const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  // Get the token from the 'Authorization' header
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'yourSecretKey'); // 'yourSecretKey' should match the key you used to sign the token
    req.user = decoded; // Attach decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;

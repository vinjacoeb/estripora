const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const validator = require('validator'); // Optional, for email validation or password validation
const crypto = require("crypto");

const router = express.Router();
const secretKey = 'a6f8d9c8e1b2a3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0wxyz1234'; // Replace with a secure secret key

// Database connection (using pool for better performance)
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'disporas_web',
  connectionLimit: 10,
});

// Helper function for database queries
const queryDB = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Sign-up Route
router.post('/sign-up', async (req, res) => {
    console.log('Received request:', req.body);  // Log incoming data
    const { user, email, password } = req.body;

    // Validate required fields
    if (!user || !email || !password) {
      console.log('Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Optional: Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
      // Check if email already exists
      const emailCheckQuery = 'SELECT * FROM webdis_user WHERE email = ?';
      const emailCheckResult = await queryDB(emailCheckQuery, [email]);

      if (emailCheckResult.length > 0) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database, including status with default value 1
      const query = 'INSERT INTO webdis_user (user, name, email, password, status, about) VALUES (?, ?, ?, ?, ?, ?)';
      await queryDB(query, [user, user, email, hashedPassword, 1, "none"]);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during sign-up:', error);
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
});

// Sign-in Route
router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Query to find the user by email
    const query = 'SELECT * FROM webdis_user WHERE email = ?';
    const result = await queryDB(query, [email]);

    // If no user found with the given email
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = result[0];

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Create a JWT token for the user
    const token = jwt.sign({ id: user.id, user: user.user }, secretKey, { expiresIn: '1h' });

    // Check the user's status and respond accordingly
    if (user.status === 1) {
      return res.status(200).json({ message: 'Login successful. Redirecting to home page.', token, status: 1, userName: user.user, id: user.id });
    } else if (user.status === 2) {
      return res.status(200).json({ message: 'Login successful. Redirecting to dashboard.', token, status: 2, userName: user.user, id: user.id });
    } else {
      return res.status(403).json({ error: 'User status is not valid.' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error occurred.' });
  }
});

// Reset password Route
router.post('/reset-password', async (req, res) => {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirm password do not match.' });
    }

    try {
      // Check if the user exists by email
      const query = 'SELECT * FROM webdis_user WHERE email = ?';
      const result = await queryDB(query, [email]);

      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const user = result[0];

      // Verify the old password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Old password is incorrect.' });
      }

      // Hash the new password and update it in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updateQuery = 'UPDATE webdis_user SET password = ? WHERE email = ?';
      await queryDB(updateQuery, [hashedPassword, email]);

      res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
});

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token is required.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Status Route
router.get('/status', verifyToken, async (req, res) => {
    try {
      const userId = req.userId;
      const query = 'SELECT status FROM webdis_user WHERE id = ?';
      const result = await queryDB(query, [userId]);

      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const status = result[0].status;
      res.status(200).json({ status });
    } catch (err) {
      console.error('Error fetching user status:', err);
      res.status(500).json({ error: 'An error occurred while fetching user status.' });
    }
});


module.exports = router;

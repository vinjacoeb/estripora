const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const validator = require('validator');
const crypto = require("crypto");

const router = express.Router();
const secretKey = 'a6f8d9c8e1b2a3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0wxyz1234'; // Ganti dengan kunci rahasia yang aman

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
      if (err) reject(err);
      else resolve(result);
    });
  });
};

router.post('/sign-up', async (req, res) => {
    console.log('Received request:', req.body);  // Log incoming data
    const { user, email, password } = req.body;
  
    // Validate required fields
    if (!user || !email || !password) {
      console.log('Missing fields');
      return res.status(400).send({ message: 'All fields are required' });
    }
  
    try {
      // Check if email already exists
      const emailCheckQuery = 'SELECT * FROM webdis_user WHERE email = ?';
      const emailCheckResult = await queryDB(emailCheckQuery, [email]);
  
      if (emailCheckResult.length > 0) {
        return res.status(400).send({ message: 'Email already in use' });
      }
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into the database, including status with default value 1
      const query = 'INSERT INTO webdis_user (user, name, email, password, status, about) VALUES (?, ?, ?, ?, ?, ?)';
      await queryDB(query, [user, user, email, hashedPassword, 1, "none"]);
  
      res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during sign-up:', error);
      return res.status(500).send({ message: 'An error occurred. Please try again.' });
    }
  });
  
  

// Login pengguna
// Sign-in (Login) Route
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
        // User status is 1, send username and token in response
        return res.status(200).json({ message: 'Login successful. Redirecting to home page.', token, status: 1, userName: user.user });
      } else if (user.status === 2) {
        // User status is 2, send username and token in response
        return res.status(200).json({ message: 'Login successful. Redirecting to dashboard.', token, status: 2, userName: user.user });
      } else {
        // If status is neither 1 nor 2, return an error
        return res.status(403).json({ error: 'User status is not valid.' });
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Server error occurred.' });
    }
});


// Reset password
// Reset password dengan konfirmasi password baru
router.post('/reset-password', async (req, res) => {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
  
    // Validasi input
    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    // Periksa apakah password baru dan konfirmasi password cocok
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirm password do not match.' });
    }
  
    try {
      // Periksa apakah email terdaftar
      const query = 'SELECT * FROM webdis_user WHERE email = ?';
      const result = await queryDB(query, [email]);
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const user = result[0];
  
      // Verifikasi password lama
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Old password is incorrect.' });
      }
  
      // Hash password baru
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Perbarui password di database
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

// Example route that requires authentication
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const query = 'SELECT user, name, email FROM webdis_user WHERE id = ?';
    const result = await queryDB(query, [req.userId]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Profile not found.' });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Server error occurred.' });
  }
});

module.exports = router;

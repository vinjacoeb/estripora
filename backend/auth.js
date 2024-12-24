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
  database: 'estripora',
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
  console.log('Received request:', req.body); // Log incoming data
  const { user, email, password, nik, no_tlp } = req.body;

  // Validate required fields
  if (!user || !email || !password || !nik || !no_tlp) {
      console.log('Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
  }

  // Optional: Validate email format
  if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
      // Check if email already exists
      const emailCheckQuery = 'SELECT * FROM user WHERE email = ?';
      const emailCheckResult = await queryDB(emailCheckQuery, [email]);

      if (emailCheckResult.length > 0) {
          return res.status(400).json({ message: 'Email already in use' });
      }

      // Generate new id_user
      const idQuery = 'SELECT id_user FROM user ORDER BY id_user DESC LIMIT 1';
      const lastIdResult = await queryDB(idQuery);
      let newId = 'USR-001';

      if (lastIdResult.length > 0) {
          const lastId = lastIdResult[0].id_user;
          const numericPart = parseInt(lastId.split('-')[1], 10);
          const nextNumericPart = numericPart + 1;
          newId = `USR-${String(nextNumericPart).padStart(3, '0')}`;
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      const query =
          'INSERT INTO user (id_user, user, email, password, role, nik, no_tlp) VALUES (?, ?, ?, ?, ?, ?, ?)';
      await queryDB(query, [newId, user, email, hashedPassword, 'User', nik, no_tlp]);

      res.status(201).json({ message: 'User registered successfully', id_user: newId });
  } catch (error) {
      console.error('Error during sign-up:', error);
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

// Sign-in Route
router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Query untuk mencari user berdasarkan email
    const query = 'SELECT * FROM user WHERE email = ?';
    const result = await queryDB(query, [email]);

    // Jika user tidak ditemukan
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = result[0];

    // Periksa kecocokan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id_user, user: user.user, role: user.role }, secretKey, { expiresIn: '1h' });

    // Respon berdasarkan role pengguna
    if (user.role === 'Admin') {
      return res.status(200).json({
        message: 'Login successful. Redirecting to admin dashboard.',
        token,
        role: 'Admin',
        userName: user.user,
        id: user.id_user,
      });
    } else if (user.role === 'User') {
      return res.status(200).json({
        message: 'Login successful. Redirecting to user dashboard.',
        token,
        role: 'User',
        userName: user.user,
        id: user.id_user,
      });
    } else {
      return res.status(403).json({ error: 'Invalid user role.' });
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

    // Query untuk mengambil role pengguna berdasarkan id_user
    const query = 'SELECT role FROM user WHERE id_user = ?';
    const result = await queryDB(query, [userId]);

    // Jika pengguna tidak ditemukan
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Ambil nilai role dari hasil query
    const role = result[0].role;
    res.status(200).json({ role });
  } catch (err) {
    console.error('Error fetching user role:', err);
    res.status(500).json({ error: 'An error occurred while fetching user role.' });
  }
});



module.exports = router;

// headeradmin.js
const express = require("express");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "estripora"
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

  jwt.verify(tokenWithoutBearer, 'a6f8d9c8e1b2a3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0wxyz1234', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.userId = decoded.id;
    next();
  });
}

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

// Endpoint untuk mengambil data pengguna (memerlukan token)
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Query untuk mengambil data pengguna berdasarkan id_user
    const query = 'SELECT id_user, user, email FROM user WHERE id_user = ?';
    const result = await queryDB(query, [userId]);

    // Periksa apakah data pengguna ditemukan
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ambil data pengguna
    const user = result[0];

    // Kembalikan data pengguna
    res.status(200).json({
      id_user: user.id_user,
      user: user.user,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user data:', error.message || error);
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});


module.exports = router;
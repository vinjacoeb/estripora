const express = require('express');
const mysql = require('mysql');

const router = express.Router();

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
          console.error('Database query error:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };



module.exports = router;

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

// Misalnya jika menggunakan MySQL dengan query yang dikirim
router.get('/transaksi', async (req, res) => {
  try {
    const { id_user } = req.query;  // Ambil id_user dari query string
    const query = `
      SELECT 
        id_user, 
        order_id, 
        gross_amount, 
        customer_name, 
        customer_email, 
        sarana, 
        GROUP_CONCAT(DISTINCT tanggal ORDER BY tanggal ASC) AS tanggal, 
        GROUP_CONCAT(DISTINCT quantity ORDER BY tanggal ASC) AS quantity, 
        GROUP_CONCAT(DISTINCT start_time ORDER BY start_time ASC) AS start_time, 
        GROUP_CONCAT(DISTINCT end_time ORDER BY end_time ASC) AS end_time, 
        status  
      FROM transaksi
      WHERE id_user = ? AND status = 'Berhasil'
      GROUP BY id_user, order_id, gross_amount, customer_name, customer_email, sarana, status;
    `;

    db.query(query, [id_user], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Pastikan bahwa results adalah array
      if (Array.isArray(results)) {
        return res.json({ data: results });
      } else {
        return res.status(500).json({ error: 'Invalid response format' });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// Export the router
module.exports = router;


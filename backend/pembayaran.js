
const express = require('express');
const mysql = require('mysql');

const router = express.Router();
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
        console.error('Database query error:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Endpoint to get all payments
router.get('/pembayaran', async (req, res) => {
  try {
    const query = `SELECT * FROM transactions`;
    const data = await queryDB(query);

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching payment data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching payment data.' });
  }
});

// Endpoint to get payment by ID
router.get('/pembayar/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the id from the URL parameter
    const query = `SELECT * FROM transactions WHERE id = ?`; // Use the id to query the database
    const data = await queryDB(query, [id]); // Query the database using the id

    if (data.length === 0) {
      return res.status(404).json({ success: false, message: 'Data pembayaran tidak ditemukan' });
    }

    // Return the first record (since the query should return at most 1 row)
    res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error fetching payment data by ID:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching payment data.' });
  }
});


// Endpoint to update payment status by ID
router.put('/pembayaran/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;  // Only updating the 'status' field

    const query = `
      UPDATE transactions
      SET status = ?
      WHERE id = ?
    `;

    const result = await queryDB(query, [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Data pembayaran tidak ditemukan atau tidak ada perubahan' });
    }

    res.status(200).json({ success: true, message: 'Status pembayaran berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating payment status.' });
  }
});


// Endpoint to delete payment by ID
router.delete('/pembayaran/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM transactions WHERE id = ?`;

    const result = await queryDB(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Data pembayaran tidak ditemukan' });
    }

    res.status(200).json({ success: true, message: 'Data pembayaran berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting payment data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while deleting payment data.' });
  }
});
// Export the router
module.exports = router;


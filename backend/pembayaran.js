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

router.get('/pembayaran', async (req, res) => {
  try {
    const query = `
      SELECT 
        id_transaksi,
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
      GROUP BY id_transaksi,order_id, gross_amount,customer_name, customer_email, sarana, status
    `;
    
    const data = await queryDB(query);

    // Process the data to ensure the desired format for price, quantity, start_time, and end_time
    const processedData = data.map(item => ({
      ...item,
      start_time: item.start_time.split(',').join(', '),  // Join all start_times with commas
      end_time: item.end_time.split(',').join(', ')  // Join all end_times with commas
    }));

    res.status(200).json({ success: true, data: processedData });
  } catch (error) {
    console.error('Error fetching payment data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching payment data.' });
  }
});



// Endpoint to get payment by ID
router.get('/pembayaran/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the id from the URL parameter
    const query = 'SELECT id_transaksi,status FROM transaksi WHERE id_transaksi = ?'; // Use the id to query the database
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
      UPDATE transaksi
      SET status = ?
      WHERE id_transaksi = ?
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


// Export the router
module.exports = router;
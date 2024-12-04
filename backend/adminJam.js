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

// Endpoint to get all operational hours
router.get('/jam', async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM webdis_data_estripora
    `;
    const data = await queryDB(query);

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching all jam data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching all jam data.' });
  }
});

// Endpoint to get operational hours by ID
router.get('/jam/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT 
        sarana,
        hari1, jam1, jam11, 
        hari2, jam2, jam22, 
        hari3, jam3, jam33, 
        hari4, jam4, jam44, 
        hari5, jam5, jam55, 
        hari6, jam6, jam66, 
        hari7, jam7, jam77
      FROM webdis_data_estripora
      WHERE id = ?
    `;

    const data = await queryDB(query, [id]);

    if (data.length === 0) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error fetching jam data by id:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching jam data.' });
  }
});

// Endpoint to update operational hours by ID
router.put('/jam/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      hari1, jam1, jam11,
      hari2, jam2, jam22,
      hari3, jam3, jam33,
      hari4, jam4, jam44,
      hari5, jam5, jam55,
      hari6, jam6, jam66,
      hari7, jam7, jam77,
    } = req.body;

    const query = `
      UPDATE webdis_data_estripora
      SET
        hari1 = ?, jam1 = ?, jam11 = ?,
        hari2 = ?, jam2 = ?, jam22 = ?,
        hari3 = ?, jam3 = ?, jam33 = ?,
        hari4 = ?, jam4 = ?, jam44 = ?,
        hari5 = ?, jam5 = ?, jam55 = ?,
        hari6 = ?, jam6 = ?, jam66 = ?,
        hari7 = ?, jam7 = ?, jam77 = ?
      WHERE id = ?
    `;

    const result = await queryDB(query, [
      hari1, jam1, jam11,
      hari2, jam2, jam22,
      hari3, jam3, jam33,
      hari4, jam4, jam44,
      hari5, jam5, jam55,
      hari6, jam6, jam66,
      hari7, jam7, jam77,
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan atau tidak ada perubahan' });
    }

    res.status(200).json({ success: true, message: 'Data berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating jam data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating jam data.' });
  }
});

// Endpoint to delete operational hours by ID
// Endpoint to update operational hours by ID
router.put('/jam/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        hari1, jam1, jam11,
        hari2, jam2, jam22,
        hari3, jam3, jam33,
        hari4, jam4, jam44,
        hari5, jam5, jam55,
        hari6, jam6, jam66,
        hari7, jam7, jam77,
      } = req.body;
  
      // Log the received data to check for correctness
      console.log('Received data:', {
        hari1, jam1, jam11,
        hari2, jam2, jam22,
        hari3, jam3, jam33,
        hari4, jam4, jam44,
        hari5, jam5, jam55,
        hari6, jam6, jam66,
        hari7, jam7, jam77,
      });
  
      const query = `
        UPDATE webdis_data_estripora
        SET
          hari1 = ?, jam1 = ?, jam11 = ?,
          hari2 = ?, jam2 = ?, jam22 = ?,
          hari3 = ?, jam3 = ?, jam33 = ?,
          hari4 = ?, jam4 = ?, jam44 = ?,
          hari5 = ?, jam5 = ?, jam55 = ?,
          hari6 = ?, jam6 = ?, jam66 = ?,
          hari7 = ?, jam7 = ?, jam77 = ?
        WHERE id = ?
      `;
  
      const result = await queryDB(query, [
        hari1, jam1, jam11,
        hari2, jam2, jam22,
        hari3, jam3, jam33,
        hari4, jam4, jam44,
        hari5, jam5, jam55,
        hari6, jam6, jam66,
        hari7, jam7, jam77,
        id
      ]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Data tidak ditemukan atau tidak ada perubahan' });
      }
  
      res.status(200).json({ success: true, message: 'Data berhasil diperbarui' });
    } catch (error) {
      console.error('Error updating jam data:', error);
      res.status(500).json({ success: false, message: 'An error occurred while updating jam data.' });
    }
  });
  

// Export the router
module.exports = router;

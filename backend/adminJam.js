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

// Endpoint to get all operational hours
router.get('/jam', async (req, res) => {
  try {
    const query = `
      SELECT 
        sarana.id_sarana,
        sarana.nama_sarana,
        kategori.nama_kategori
      FROM 
        sarana
      JOIN kategori ON sarana.id_kategori = kategori.id_kategori;
    `;

    const data = await queryDB(query);

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching jam data:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengambil data jam operasional.' });
  }
});

// Endpoint to get operational hours by ID
router.get('/jam/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID tidak diberikan' });
    }

    const query = `
      SELECT 
        id_jam, 
        id_sarana, 
        hari, 
        jam_mulai, 
        jam_selesai
      FROM 
        jam_operasional
      WHERE 
        id_sarana = ?
    `;

    const data = await queryDB(query, [id]);

    if (data.length === 0) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }

    res.status(200).json({ success: true, data }); // Mengirim data dalam array
  } catch (error) {
    console.error('Error fetching jam data by ID:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengambil data jam operasional.' });
  }
});


router.post('/jam', async (req, res) => {
  const { hari, jam_mulai, jam_selesai, id_sarana } = req.body;

  // Validasi input
  if (!hari || !jam_mulai || !jam_selesai || !id_sarana) {
    return res.status(400).json({
      success: false,
      message: 'Hari, Jam Mulai, Jam Selesai, dan ID Sarana harus disertakan.'
    });
  }

  try {
    // Ambil id_jam terakhir untuk membuat ID baru
    const queryLastId = `SELECT id_jam FROM jam_operasional ORDER BY id_jam DESC LIMIT 1`;
    const lastIdResult = await queryDB(queryLastId);

    // Membuat id_jam baru
    let newIdJam = 'JAM-001'; // Default ID jika belum ada data
    if (lastIdResult.length > 0) {
      const lastId = lastIdResult[0].id_jam;
      const lastNumber = lastId.split('-')[1];
      const newNumber = (parseInt(lastNumber) + 1).toString().padStart(3, '0');
      newIdJam = `JAM-${newNumber}`;
    }

    // Query untuk menambahkan data jam operasional
    const queryInsert = `
      INSERT INTO jam_operasional (id_jam, id_sarana, hari, jam_mulai, jam_selesai)
      VALUES (?, ?, ?, ?, ?)
    `;
    await queryDB(queryInsert, [newIdJam, id_sarana, hari, jam_mulai, jam_selesai]);

    res.status(201).json({
      success: true,
      message: 'Jam operasional berhasil ditambahkan.',
      id_jam: newIdJam
    });
  } catch (error) {
    console.error('Error adding jam operasional:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menambahkan jam operasional.'
    });
  }
});



// Endpoint to update operational hours by ID
router.put('/jam/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { hari, jam_mulai, jam_selesai } = req.body;

    if (!id || !hari || !jam_mulai || !jam_selesai) {
      return res.status(400).json({
        success: false,
        message: 'ID, Hari, Jam Mulai, dan Jam Selesai harus disertakan.',
      });
    }

    const query = `
      UPDATE jam_operasional
      SET hari = ?, jam_mulai = ?, jam_selesai = ?
      WHERE id_jam = ?
    `;

    const result = await queryDB(query, [hari, jam_mulai, jam_selesai, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan atau tidak ada perubahan.',
      });
    }

    res.status(200).json({ success: true, message: 'Data berhasil diperbarui.' });
  } catch (error) {
    console.error('Error updating jam data:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui data jam operasional.',
    });
  }
});

// Endpoint to delete operational hours by ID
router.delete('/jam/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID tidak diberikan' });
    }

    const query = `DELETE FROM jam_operasional WHERE id_jam = ?`;

    const result = await queryDB(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan atau sudah terhapus.',
      });
    }

    res.status(200).json({ success: true, message: 'Data berhasil dihapus.' });
  } catch (error) {
    console.error('Error deleting jam data:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus data jam operasional.',
    });
  }
});

// Export the router
module.exports = router;

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

  router.get('/fasilitas-read', (req, res) => {
    const query = `
      SELECT 
        fasilitas.id_fasilitas, 
        fasilitas.nama_fasilitas, 
        fasilitas.qty, 
        fasilitas.kondisi, 
        sarana.nama_sarana
      FROM 
        fasilitas
      JOIN 
        sarana 
      ON 
        fasilitas.id_sarana = sarana.id_sarana
    `;
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  });

  // Get categories
router.get('/sarana', (req, res) => {
    const query = `SELECT id_sarana, nama_sarana FROM sarana ORDER BY nama_sarana ASC`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

  // Add new data
  router.post('/fasilitas-add', (req, res) => {
    const { nama_fasilitas, id_sarana, qty, kondisi } = req.body;
  
    // Validasi input
    if (!nama_fasilitas || !id_sarana || !qty || !kondisi) {
      return res.status(400).json({ message: 'Semua data wajib diisi.' });
    }
  
    // Ambil id_fasilitas terakhir untuk membuat ID baru
    const queryLastId = `SELECT id_fasilitas FROM fasilitas ORDER BY id_fasilitas DESC LIMIT 1`;
    db.query(queryLastId, (err, result) => {
      if (err) {
        console.error('Error fetching last id_fasilitas:', err);
        return res.status(500).send(err);
      }
  
      // Membuat id_fasilitas baru
      let newIdFasilitas = 'FS-001'; // Default ID jika belum ada data
      if (result.length > 0) {
        const lastId = result[0].id_fasilitas;
        const lastNumber = lastId.split('-')[1];
        const newNumber = (parseInt(lastNumber) + 1).toString().padStart(3, '0');
        newIdFasilitas = `FS-${newNumber}`;
      }
  
      // Query untuk menambahkan data fasilitas
      const queryInsert = `
        INSERT INTO fasilitas (id_fasilitas, id_sarana, nama_fasilitas, qty, kondisi)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(queryInsert, [newIdFasilitas, id_sarana, nama_fasilitas, qty, kondisi], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).send(err);
        }
        res.json({ message: 'Data fasilitas berhasil ditambahkan', data: result });
      });
    });
  });

  // Get single fasilitas data
router.get('/fasilitas-edit/:id', (req, res) => {
    const { id } = req.params;
    const query = `
      SELECT 
        id_fasilitas, 
        id_sarana, 
        nama_fasilitas, 
        qty, 
        kondisi 
      FROM 
        fasilitas
      WHERE
        id_fasilitas = ?
    `;
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send(err);
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ message: 'Data not found' });
        }
      }
    });
  });
  
  

  // Update data fasilitas
router.put('/fasilitas-edit/:id', (req, res) => {
    const { id } = req.params;
    const { id_sarana, nama_fasilitas, qty, kondisi } = req.body;
  
    const query = `
      UPDATE fasilitas 
      SET id_sarana = ?, nama_fasilitas = ?, qty = ?, kondisi = ? 
      WHERE id_fasilitas = ?
    `;
    db.query(query, [id_sarana, nama_fasilitas, qty, kondisi, id], (err, result) => {
      if (err) {
        console.error('Error updating fasilitas:', err);
        res.status(500).send(err);
      } else {
        res.send({ message: 'Fasilitas updated successfully!', result });
      }
    });
  });
  

  // Delete data fasilitas
router.delete('/fasilitas-delete/:id', (req, res) => {
    const { id } = req.params;
  
    const query = "DELETE FROM fasilitas WHERE id_fasilitas = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting fasilitas:', err);
        res.status(500).send(err);
      } else if (result.affectedRows === 0) {
        res.status(404).send({ message: 'Fasilitas not found' });
      } else {
        res.send({ message: 'Fasilitas deleted successfully!', result });
      }
    });
  });
  

module.exports = router;
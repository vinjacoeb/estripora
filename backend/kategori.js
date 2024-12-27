const express = require('express');
const mysql = require('mysql');

const router = express.Router();

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'estripora'
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

// GET - Fetch all categories
router.get('/', async (req, res) => {
  try {
    const result = await queryDB('SELECT * FROM kategori ORDER BY id_kategori DESC');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Fetch single category by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await queryDB('SELECT * FROM kategori WHERE id_kategori = ?', [req.params.id]);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST - Create new category with provided ID
router.post('/', async (req, res) => {
  const { id_kategori, nama_kategori, alamat, kecamatan, lokasi } = req.body;
  
  try {
    // Validate that id_kategori is provided and in correct format
    if (!id_kategori || !/^[A-Z]{2,3}$/.test(id_kategori)) {
      return res.status(400).json({ 
        error: 'Invalid ID format. ID must be 2-3 uppercase letters.' 
      });
    }

    // Check if ID already exists
    const existingCategory = await queryDB(
      'SELECT id_kategori FROM kategori WHERE id_kategori = ?', 
      [id_kategori]
    );

    if (existingCategory.length > 0) {
      return res.status(409).json({ 
        error: 'Category ID already exists' 
      });
    }

    // Insert new category with provided ID
    const result = await queryDB(
      'INSERT INTO kategori (id_kategori, nama_kategori, alamat, kecamatan, lokasi) VALUES (?, ?, ?, ?, ?)',
      [id_kategori, nama_kategori, alamat, kecamatan, lokasi]
    );
    
    res.status(201).json({ 
      message: 'Category created successfully',
      id_kategori: id_kategori
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT - Update category
router.put('/:id', async (req, res) => {
  const { nama_kategori, alamat, kecamatan, lokasi } = req.body;
  try {
    // Check if category exists before updating
    const existingCategory = await queryDB(
      'SELECT id_kategori FROM kategori WHERE id_kategori = ?', 
      [req.params.id]
    );

    if (existingCategory.length === 0) {
      return res.status(404).json({ 
        error: 'Category not found' 
      });
    }

    await queryDB(
      'UPDATE kategori SET nama_kategori = ?, alamat = ?, kecamatan = ?, lokasi = ? WHERE id_kategori = ?',
      [nama_kategori, alamat, kecamatan, lokasi, req.params.id]
    );
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE - Delete category
router.delete('/:id', async (req, res) => {
  try {
    const result = await queryDB('DELETE FROM kategori WHERE id_kategori = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        error: 'Category not found' 
      });
    }
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
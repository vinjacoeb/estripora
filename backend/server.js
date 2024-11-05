const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'disporas_web'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes

// Get all data without lokasi, longitude, and latitude
app.get('/backend', (req, res) => {
  const query = "SELECT id, kecamatan, nama, sarana, gambar, harga FROM webdis_data_estripora";
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Get a single data entry by ID without lokasi, longitude, and latitude
app.get('/backend/:id', (req, res) => {
  const { id } = req.params;
  const query = "SELECT id, kecamatan, nama, sarana, gambar, harga FROM webdis_data_estripora WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send(err);
    } else {
      res.send(result[0]);
    }
  });
});

// Add a new data entry without lokasi, longitude, and latitude
app.post('/backend', upload.single('gambar'), (req, res) => {
  const { kecamatan, nama, sarana, harga } = req.body;
  const gambar = req.file ? req.file.filename : null;
  const query = "INSERT INTO webdis_data_estripora (kecamatan, nama, sarana, gambar, harga) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [kecamatan, nama, sarana, gambar, harga], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Update a data entry without lokasi, longitude, and latitude
app.put('/backend/:id', upload.single('gambar'), (req, res) => {
  const { id } = req.params;
  const { kecamatan, nama, sarana, harga } = req.body;
  const gambar = req.file ? req.file.filename : req.body.gambar;

  const query = "UPDATE webdis_data_estripora SET kecamatan = ?, nama = ?, sarana = ?, gambar = ?, harga = ? WHERE id = ?";
  db.query(query, [kecamatan, nama, sarana, gambar, harga, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Delete a data entry
app.delete('/backend/:id', (req, res) => {
  const { id } = req.params;

  // First, retrieve the existing image name to delete the file
  const selectQuery = "SELECT gambar FROM webdis_data_estripora WHERE id = ?";
  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error('Error fetching image for deletion:', err);
      res.status(500).send(err);
    } else {
      const gambar = result[0].gambar;
      if (gambar) {
        const filePath = path.join(__dirname, 'uploads', gambar);
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }

      // After deleting the image file, delete the data entry
      const query = "DELETE FROM webdis_data_estripora WHERE id = ?";
      db.query(query, [id], (err, result) => {
        if (err) {
          console.error('Error deleting data:', err);
          res.status(500).send(err);
        } else {
          res.send(result);
        }
      });
    }
  });
});

// Server listen
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

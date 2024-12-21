
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./auth'); // Import the auth routes
const saranaRoutes = require("./sarana");
const adminJamRoutes = require('./adminJam');
const paymentRoutes = require('./payment');
const pembayaranRoutes = require('./pembayaran');
const adminheaderRoutes = require('./adminheader');
const akunRoutes = require('./akun');

const app = express();


// Middleware
app.use(cors());


app.use(express.json());  // Parse JSON request bodies
app.use('/images', express.static(path.join(__dirname, 'uploads')));  // Serve static images from the 'uploads' folder

// Middleware for auth routes
app.use('/api/auth', authRoutes);  // Prefix all routes from auth.js with /api/auth
app.use("/api/sarana", saranaRoutes);
app.use('/api/adminJam', adminJamRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/pembayaran', pembayaranRoutes);
app.use('/api/adminheader', adminheaderRoutes);
app.use('/api/akun', akunRoutes);

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

// Function to sanitize file names
const cleanFileName = (fileName) => {
  return fileName.toLowerCase().replace(/[^a-z0-9.]/g, '_');
};

// Multer storage configuration with unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    const cleanName = cleanFileName(nameWithoutExt);
    
    let finalName = `${cleanName}${ext}`;
    let counter = 1;
    
    while (fs.existsSync(path.join(__dirname, 'uploads', finalName))) {
      finalName = `${cleanName}_${counter}${ext}`;
      counter++;
    }
    
    cb(null, finalName);
  }
});

const upload = multer({ storage });

// Routes

// Get all data
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

// Get single data
app.get('/backend/:id', (req, res) => {
  const { id } = req.params;
  const query = "SELECT id, kecamatan, nama, sarana, gambar, harga FROM webdis_data_estripora WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send(err);
    } else {
      if (result[0] && result[0].gambar) {
        result[0].gambar = `http://localhost:3001/images/${result[0].gambar}`;
      }
      res.send(result[0]);
    }
  });
});

// Add new data
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

// Update data
app.put('/backend/:id', upload.single('gambar'), (req, res) => {
  const { id } = req.params;
  const { kecamatan, nama, sarana, harga } = req.body;
  const newGambar = req.file ? req.file.filename : req.body.gambar;

  // Delete old image if uploading a new one
  if (req.file) {
    const selectQuery = "SELECT gambar FROM webdis_data_estripora WHERE id = ?";
    db.query(selectQuery, [id], (err, result) => {
      if (err) {
        console.error('Error fetching old image:', err);
      } else if (result[0] && result[0].gambar) {
        const oldFilePath = path.join(__dirname, 'uploads', result[0].gambar);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.error('Error deleting old file:', err);
        });
      }
    });
  }

  const query = "UPDATE webdis_data_estripora SET kecamatan = ?, nama = ?, sarana = ?, gambar = ?, harga = ? WHERE id = ?";
  db.query(query, [kecamatan, nama, sarana, newGambar, harga, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Delete data
app.delete('/backend/:id', (req, res) => {
  const { id } = req.params;

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


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
const kategoriRoutes = require('./kategori');
const fasilitasRoutes = require('./fasilitas');
const transaksiRoutes = require('./transaksi');

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
app.use('/api/kategori', kategoriRoutes);
app.use('/api/fasilitas', fasilitasRoutes);
app.use('/api/transaksi', transaksiRoutes);

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'estripora'
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

app.get('/backend', (req, res) => {
  const query = `
    SELECT 
      sarana.id_sarana, 
      sarana.nama_sarana, 
      sarana.gambar, 
      sarana.harga, 
      sarana.deskripsi, 
      kategori.nama_kategori
    FROM 
      sarana
    JOIN 
      kategori 
    ON 
      sarana.id_kategori = kategori.id_kategori
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


// Get single data
app.get('/backend/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT 
      id_sarana, 
      nama_sarana, 
      gambar, 
      harga, 
      deskripsi
    FROM 
      sarana
    WHERE
      id_sarana =?
  `;
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

// Get categories
app.get('/categories', (req, res) => {
  const query = `SELECT id_kategori, nama_kategori FROM kategori ORDER BY nama_kategori ASC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Add new data
app.post('/backend-add', upload.single('gambar'), (req, res) => {
  const { nama, sarana, harga, deskripsi } = req.body;
  const gambar = req.file ? req.file.filename : null;

  if (!nama || !sarana || !harga) {
    return res.status(400).json({ message: 'Semua data wajib diisi.' });
  }

  const id_kategori = sarana;

  const queryLastId = `SELECT id_sarana FROM sarana WHERE id_kategori = ? ORDER BY id_sarana DESC LIMIT 1`;
  db.query(queryLastId, [id_kategori], (err, result) => {
    if (err) {
      console.error('Error fetching last id_sarana:', err);
      return res.status(500).send(err);
    }

    let newIdSarana = `${id_kategori}-001`;
    if (result.length > 0) {
      const lastId = result[0].id_sarana;
      const lastNumber = lastId.split('-')[1];
      const newNumber = (parseInt(lastNumber) + 1).toString().padStart(3, '0');
      newIdSarana = `${id_kategori}-${newNumber}`;
    }

    const queryInsert = `INSERT INTO sarana (id_sarana, nama_sarana, gambar, harga,deskripsi, id_kategori) VALUES (?, ?, ?, ?, ?,?)`;
    db.query(queryInsert, [newIdSarana, nama, gambar, harga,deskripsi, id_kategori], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send(err);
      }
      res.json({ message: 'Data berhasil ditambahkan', data: result });
    });
  });
});


// Update data
app.put('/backend/:id', upload.single('gambar'), (req, res) => {
  const { id } = req.params;
  const { nama_sarana, harga, deskripsi } = req.body;
  const newGambar = req.file ? req.file.filename : req.body.gambar;

  // Delete old image if uploading a new one
  if (req.file) {
    const selectQuery = "SELECT gambar FROM sarana WHERE id_sarana = ?";
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

  const query = "UPDATE sarana SET nama_sarana = ?,  gambar = ?, harga = ?, deskripsi = ? WHERE id_sarana = ?";
  db.query(query, [nama_sarana, newGambar, harga, deskripsi, id], (err, result) => {
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

  const selectQuery = "SELECT gambar FROM sarana WHERE id_sarana = ?";
  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error('Error fetching image for deletion:', err);
      res.status(500).send(err);
    } else if (result.length === 0) {  // Check if no result was found
      console.error('No data found for id:', id);
      res.status(404).send('Data not found');
    } else {
      const gambar = result[0].gambar;
      if (gambar) {
        const filePath = path.join(__dirname, 'uploads', gambar);
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }

      const query = "DELETE FROM sarana WHERE id_sarana = ?";
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

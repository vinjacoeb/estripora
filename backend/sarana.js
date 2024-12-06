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
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Endpoint to fetch all sarana data
router.get('/depan', async (req, res) => {
  try {
    const query = 'SELECT * FROM webdis_data_estripora';
    const data = await queryDB(query);

    // Format the data if needed (e.g., add default values or process images)
    const formattedData = data.map(item => ({
      id: item.id || crypto.randomUUID(), // Ensure each item has an ID
      nama: item.nama,
      kecamatan: item.kecamatan || 'Unknown',
      harga: item.harga || 'Harga tidak tersedia',
      gambar: `../backend/uploads/${item.gambar}`, // Append upload path for images
      sarana: item.sarana || 'Uncategorized',
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching sarana data:', error);
    res.status(500).json({ error: 'An error occurred while fetching sarana data.' });
  }
});

// Endpoint to fetch sarana details by ID
// Endpoint untuk mengambil detail sarana berdasarkan ID
router.get('/detail/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        // Query untuk mengambil data detail sarana beserta jam operasional
        const query = `
            SELECT 
                id, nama, sarana, kecamatan, harga, gambar,
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
            return res.status(404).json({ message: 'Sarana tidak ditemukan.' });
        }
  
        const detail = data[0]; // Ambil data detail pertama
  
        // Format jam operasional berdasarkan kolom hari dan jam
        const jamOperasional = [];
        for (let i = 1; i <= 7; i++) {
            jamOperasional.push({
                hari: detail[`hari${i}`],
                jam_mulai: detail[`jam${i}`],
                jam_selesai: detail[`jam${i}${i}`],
            });
        }
  
        // Format respons
        const formattedDetail = {
            id: detail.id,
            nama: detail.nama || 'Nama tidak tersedia',
            sarana: detail.sarana || 'Nama tidak tersedia',
            kecamatan: detail.kecamatan || 'Kecamatan tidak tersedia',
            harga: detail.harga || 'Harga tidak tersedia',
            gambar: `../backend/uploads/${detail.gambar}` || null,
            gambar1: detail.gambar1 ? `../backend/uploads/${detail.gambar1}` : null,
            gambar2: detail.gambar2 ? `../backend/uploads/${detail.gambar2}` : null,
            gambar3: detail.gambar3 ? `../backend/uploads/${detail.gambar3}` : null,
            deskripsi: detail.deskripsi || 'Deskripsi tidak tersedia.',
            booking_time: detail.booking_time || 'Not available',
            jam_operasional: jamOperasional, // Jam operasional yang sudah diformat
        };
  
        res.status(200).json(formattedDetail);
    } catch (error) {
        console.error('Error fetching sarana details:', error);
        res.status(500).json({ error: 'An error occurred while fetching sarana details.' });
    }
});




  

// Export the router
module.exports = router;

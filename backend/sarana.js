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
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Endpoint to fetch all sarana data
router.get('/depan', async (req, res) => {
  try {
    const query = `
      SELECT 
        sarana.id_sarana, 
        sarana.nama_sarana, 
        sarana.gambar, 
        sarana.harga, 
        kategori.nama_kategori
      FROM 
        sarana
      JOIN 
        kategori 
      ON 
        sarana.id_kategori = kategori.id_kategori
    `;

    // Eksekusi query menggunakan koneksi database
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).json({ error: 'An error occurred while fetching sarana data.' });
      }

      // Format data sebelum dikirim ke frontend
      const formattedData = results.map((item) => ({
        id: item.id_sarana, // ID unik untuk setiap sarana
        nama: item.nama_sarana, // Nama sarana
        kategori: item.nama_kategori, // Nama kategori
        harga: item.harga || 'Harga tidak tersedia', // Fallback untuk harga
        gambar: `../backend/uploads/${item.gambar}`, // Gambar default jika tidak ada
      }));

      res.status(200).json(formattedData); // Kirim data terformat ke client
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'An unexpected error occurred while processing the request.' });
  }
});

// Endpoint untuk mengambil detail sarana berdasarkan ID
router.get('/detail/:id', async (req, res) => {
  const { id } = req.params;

  try {
      // Query untuk mengambil data sarana dan kategori
      const saranaQuery = `
          SELECT 
              s.id_sarana, s.nama_sarana, s.gambar, s.harga, s.deskripsi, 
              k.nama_kategori, k.alamat, k.kecamatan, k.lokasi
          FROM sarana s
          JOIN kategori k ON s.id_kategori = k.id_kategori
          WHERE s.id_sarana = ?
      `;
      const saranaData = await queryDB(saranaQuery, [id]);

      if (saranaData.length === 0) {
          return res.status(404).json({ message: 'Sarana tidak ditemukan.' });
      }

      const saranaDetail = saranaData[0]; // Ambil data sarana pertama

      // Query untuk mengambil data fasilitas langsung dari tabel fasilitas
      const fasilitasQuery = `
          SELECT 
              f.nama_fasilitas, f.qty, f.kondisi
          FROM fasilitas f
          WHERE f.id_sarana = ?
      `;
      const fasilitasData = await queryDB(fasilitasQuery, [id]);

      // Query untuk mengambil data jam operasional langsung dari tabel jam_operasional
      const jamQuery = `
          SELECT 
              j.hari, j.jam_mulai, j.jam_selesai
          FROM jam_operasional j
          WHERE j.id_sarana = ?
      `;
      const jamData = await queryDB(jamQuery, [id]);

      // Format respons
      const formattedDetail = {
          id_sarana: saranaDetail.id_sarana,
          nama_sarana: saranaDetail.nama_sarana || 'Nama tidak tersedia',
          gambar: saranaDetail.gambar ? `../backend/uploads/${saranaDetail.gambar}` : null,
          harga: saranaDetail.harga || 'Harga tidak tersedia',
          deskripsi: saranaDetail.deskripsi || 'Deskripsi tidak tersedia.',
          kategori: {
              nama_kategori: saranaDetail.nama_kategori || 'Kategori tidak tersedia',
              alamat: saranaDetail.alamat || 'Alamat tidak tersedia',
              kecamatan: saranaDetail.kecamatan || 'Kecamatan tidak tersedia',
              lokasi: saranaDetail.lokasi || 'Lokasi tidak tersedia',
          },
          fasilitas: fasilitasData.map((f) => ({
              nama_fasilitas: f.nama_fasilitas || 'Fasilitas tidak tersedia',
              qty: f.qty || 0,
              kondisi: f.kondisi || 'Kondisi tidak tersedia',
          })),
          jam_operasional: jamData.map((j) => ({
              hari: j.hari || 'Hari tidak tersedia',
              jam_mulai: j.jam_mulai || 'Jam mulai tidak tersedia',
              jam_selesai: j.jam_selesai || 'Jam selesai tidak tersedia',
          })),
      };

      res.status(200).json(formattedDetail);
  } catch (error) {
      console.error('Error fetching sarana details:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil detail sarana.' });
  }
});







  

// Export the router
module.exports = router;

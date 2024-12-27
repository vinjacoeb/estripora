
const express = require("express");
const mysql = require('mysql');
const router = express.Router();
const midtransClient = require("midtrans-client");
const jwt = require('jsonwebtoken'); // Ensure jwt is imported


const db = mysql.createConnection({
  host: "localhost",  // Sesuaikan dengan host database Anda
  user: "root",       // Sesuaikan dengan username database Anda
  password: "",       // Sesuaikan dengan password database Anda
  database: "estripora" // Sesuaikan dengan nama database Anda
});

  function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }
  
    // Remove "Bearer " prefix if it exists
    const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
  
    jwt.verify(tokenWithoutBearer, 'a6f8d9c8e1b2a3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0wxyz1234', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token." });
      }
      req.userId = decoded.id; // Assuming your token payload contains the user ID
      next();
    });
  }

// Helper function for database queries
const queryDB = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Endpoint untuk membuat transaksi Midtrans


// Endpoint untuk mengambil data pengguna (memerlukan token)
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Menggunakan userId dari payload token
    console.log('Received User ID:', userId);  // Log received userId

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const query = 'SELECT id_user, user, email from user WHERE id_user = ?';
    const result = await queryDB(query, [userId]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];
    console.log('User data:', user);  // Log user data from DB

    res.status(200).json({
      id_user: user.id_user,
      user: user.user,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);  // Log the error
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});

  
  
  
  

router.post("/bayar", async (req, res) => {
  console.log("Request Body:", req.body);  // Log request body untuk memastikan data yang diterima
  
  const snap = new midtransClient.Snap({
    isProduction: false,  // Sandbox mode
    serverKey: "SB-Mid-server-SouJaulVpqc4iMyS1ufhevg7",  // Ganti dengan Server Key Anda
  });

  try {
    const { transaction_details, customer_details, item_details } = req.body;

    if (!customer_details || !customer_details.id_user || !customer_details.user || !customer_details.email) {
      return res.status(400).json({ message: "Data pengguna tidak lengkap." });
    }

    // Data Transaksi untuk Midtrans
    const transactionData = {
      transaction_details: {
        order_id: `order-${new Date().getTime()}`,
        gross_amount: transaction_details.gross_amount,  // Pastikan harga sesuai dengan yang dikirimkan
      },
      customer_details: {
        user: customer_details.user,
        email: customer_details.email,
      },
      item_details: item_details,  // Gunakan item_details yang diterima dari frontend
    };

    // Log transaction data sebelum membuat transaksi
    console.log("Transaction Data:", transactionData);

    // Buat transaksi menggunakan Midtrans
    const transaction = await snap.createTransaction(transactionData);

    if (transaction && transaction.token) {
      console.log("Token Transaksi:", transaction.token);

      // Menyimpan data transaksi ke database
      item_details.forEach((item) => {
        const { tanggal, name: sarana, price, quantity, start_time, end_time } = item;
        const status = 'Pending';  // Default status

        const query = `
          INSERT INTO transaksi (order_id, gross_amount,id_user, customer_name, customer_email, sarana, tanggal, price, quantity, start_time, end_time, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          transactionData.transaction_details.order_id,
          transactionData.transaction_details.gross_amount,
          customer_details.id_user,
          customer_details.user,
          customer_details.email,
          sarana,
          tanggal,
          price,
          quantity,
          start_time,
          end_time,
          status
        ];

        db.query(query, values, (err, result) => {
          if (err) {
            console.error("Error inserting transaction:", err);
            return res.status(500).send("Error inserting transaction.");
          }
          console.log("Transaction inserted:", result);
        });
      });

      // Mengirimkan token transaksi Midtrans ke frontend
      res.status(200).json({ token: transaction.token });
    } else {
      res.status(500).json({ message: "Transaksi gagal dibuat." });
    }
  } catch (error) {
    console.error("Kesalahan saat membuat transaksi:", error);
    res.status(500).json({ message: "Terjadi kesalahan.", error: error.message });
  }
});

router.get('check', async (req, res) => {
  const { date, sarana } = req.query;

  try {
      const query = `
          SELECT jam_operasional.jam_mulai, jam_operasional.jam_selesai
          FROM jam_operasional
          LEFT JOIN transaksi
          ON transaksi.tanggal = ? 
          AND transaksi.start_time = jam_operasional.jam_mulai
          AND transaksi.sarana = ?
          AND transaksi.status = 'Berhasil' -- Hanya blokir jika status Berhasil
          WHERE jam_operasional.hari = DAYNAME(?)
          AND transaksi.id IS NULL;
      `;
      const [availableTimes] = await db.query(query, [date, sarana, date]);
      res.json({ availableTimes });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching availability' });
  }
});



module.exports = router;

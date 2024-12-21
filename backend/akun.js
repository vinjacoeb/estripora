const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "disporas_web",
});

// Kunci rahasia JWT (sebaiknya gunakan environment variable di produksi)
const JWT_SECRET = 'a6f8d9c8e1b2a3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0wxyz1234';

// Middleware untuk memverifikasi token JWT
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

  jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.userId = decoded.id;
    next();
  });
}

// Fungsi untuk menjalankan query database secara asinkron
const queryDB = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Endpoint untuk menampilkan data akun admin
router.get("/akun", verifyToken, async (req, res) => {
  try {
    const query = "SELECT id, `user`, email, status, time_reg FROM webdis_user WHERE status = 2";
    const results = await queryDB(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts." });
  }
});

router.get("/user", verifyToken, async (req, res) => {
  try {
    const query = "SELECT id, `user`, email, status, time_reg FROM webdis_user WHERE status = 1";
    const results = await queryDB(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts." });
  }
});

// Endpoint untuk menampilkan data akun berdasarkan ID
router.get("/akun/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT id, `user`, `name`, email, status FROM webdis_user WHERE id = ?";
    const results = await queryDB(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    console.error("Error fetching account by ID:", error);
    res.status(500).json({ message: "Failed to fetch account." });
  }
});

// Endpoint untuk menambahkan akun admin baru
router.post("/tambahakun", verifyToken, async (req, res) => {
  try {
    const { user,name, password, email, status, time_reg,about } = req.body;
    
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = "INSERT INTO webdis_user (`user`,`name`, `password`, email, status, time_reg, about) VALUES (?, ?,?, ?, ?, NOW(), 'nothing')";
    await queryDB(query, [user,user, hashedPassword, email, status, time_reg,about]);
    res.status(201).json({ message: "Account added successfully." });
  } catch (error) {
    console.error("Error adding account:", error);
    res.status(500).json({ message: "Failed to add account." });
  }
});

// Endpoint untuk mengedit akun admin
router.put("/akun/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    // Jika password diubah, hash password baru
    let query, params;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = "UPDATE webdis_user SET `name` = ?, email = ?, password = ? WHERE id = ?";
      params = [name, email, hashedPassword, id];
    } else {
      query = "UPDATE webdis_user SET `name` = ?, email = ? WHERE id = ?";
      params = [name, email, id];
    }
    
    await queryDB(query, params);
    res.status(200).json({ message: "Account updated successfully." });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ message: "Failed to update account." });
  }
});

// Endpoint untuk login
router.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    const query = "SELECT * FROM webdis_user WHERE `user` = ?";
    const results = await queryDB(query, [user]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verifikasi password menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, results[0].password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: results[0].id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ 
      message: "Login successful", 
      token: token,
      user: {
        id: results[0].id,
        user: results[0].user,
        email: results[0].email,
        status: results[0].status
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed." });
  }
});

// Endpoint untuk menghapus akun admin
router.delete("/admin/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM webdis_user WHERE id = ?";
    await queryDB(query, [id]);
    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account." });
  }
});

router.delete("/user/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM webdis_user WHERE id = ?";
    await queryDB(query, [id]);
    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account." });
  }
});

module.exports = router;
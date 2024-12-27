const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Database connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "estripora",
});

// JWT secret key (use environment variables in production)
const JWT_SECRET = 'a6f8d9c8e1b2a3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0wxyz1234';

// Middleware to verify JWT token
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

// Function to run database queries asynchronously
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

// Function to generate the next ID
async function generateNextId() {
  try {
    const query = "SELECT id_user FROM user ORDER BY id_user DESC LIMIT 1";
    const results = await queryDB(query);

    if (results.length === 0) {
      return "USR-001";
    }

    const lastId = results[0].id_user;
    const numericPart = parseInt(lastId.split('-')[1]);
    const nextNumeric = numericPart + 1;
    return `USR-${String(nextNumeric).padStart(3, '0')}`;
  } catch (error) {
    throw error;
  }
}

// Endpoint to display admin accounts
router.get("/akun", verifyToken, async (req, res) => {
  try {
    const query = "SELECT id_user, user, email, role, nik, no_tlp FROM user WHERE role = 'Admin'";
    const results = await queryDB(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts." });
  }
});

// Endpoint to display user accounts
router.get("/user", verifyToken, async (req, res) => {
  try {
    const query = "SELECT id_user, user, email, role, nik, no_tlp FROM user WHERE role = 'User'";
    const results = await queryDB(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts." });
  }
});

// Modified endpoint to display account by ID
router.get("/akun/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT id_user, user, email, role, nik, no_tlp FROM user WHERE id_user = ?";
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

// Endpoint to add new account
router.post("/tambahakun", verifyToken, async (req, res) => {
  try {
    const { user, password, email, role, nik, no_tlp } = req.body;

    // Generate next ID
    const id_user = await generateNextId();

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO user (id_user, user, password, email, role, nik, no_tlp) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await queryDB(query, [id_user, user, hashedPassword, email, role, nik, no_tlp]);
    res.status(201).json({ message: "Account added successfully." });
  } catch (error) {
    console.error("Error adding account:", error);
    res.status(500).json({ message: "Failed to add account." });
  }
});

// Endpoint to edit account
router.put("/akun/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { user, email, password, role, nik, no_tlp } = req.body;

    let query, params;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = "UPDATE user SET user = ?, email = ?, password = ?, role = ?, nik = ?, no_tlp = ? WHERE id_user = ?";
      params = [user, email, hashedPassword, role, nik, no_tlp, id];
    } else {
      query = "UPDATE user SET user = ?, email = ?, role = ?, nik = ?, no_tlp = ? WHERE id_user = ?";
      params = [user, email, role, nik, no_tlp, id];
    }

    const results = await queryDB(query, params);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.status(200).json({ message: "Account updated successfully." });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ message: "Failed to update account." });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    const query = "SELECT * FROM user WHERE user = ?";
    const results = await queryDB(query, [user]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, results[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ id: results[0].id_user }, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ 
      message: "Login successful", 
      token: token,
      user: {
        id_user: results[0].id_user,
        user: results[0].user,
        email: results[0].email,
        role: results[0].role,
        nik: results[0].nik,
        no_tlp: results[0].no_tlp
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed." });
  }
});

// Endpoint to delete admin account
router.delete("/admin/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM user WHERE id_user = ?";
    const results = await queryDB(query, [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account." });
  }
});

// Endpoint to delete user account
router.delete("/user/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM user WHERE id_user = ?";
    const results = await queryDB(query, [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account." });
  }
});

module.exports = router;

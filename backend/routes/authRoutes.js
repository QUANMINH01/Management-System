import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({ message: "Database connection error" });
  }
});

// Route đăng nhập người dùng
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      user: {
        id: rows[0].id,
        username: rows[0].username,
        email: rows[0].email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Database connection error" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("Received token:", token);
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

router.post("/add_category", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [result] = await db.query("INSERT INTO category (name) VALUES (?)", [
      req.body.category,
    ]);

    // Fetch the newly added category
    const [newCategory] = await db.query(
      "SELECT * FROM category WHERE id = ?",
      [result.insertId]
    );

    return res.status(201).json({ Status: true, data: newCategory[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, error: "Database error" });
  }
});

router.post(
  "/add_employee",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const db = await connectToDatabase();

      const { name, email, password, salary, address, category } = req.body;
      const image = req.file ? req.file.filename : null;

      const sql = `
      INSERT INTO employees (name, email, password, salary, address, category_id, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

      const [result] = await db.query(sql, [
        name,
        email,
        password,
        salary,
        address,
        category,
        image,
      ]);

      res.status(201).json({
        Status: true,
        message: "Employee added successfully",
        id: result.insertId,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ Status: false, error: "Database error" });
    }
  }
);

router.get("/home", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [
      req.userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: rows[0].id,
        username: rows[0].username,
        email: rows[0].email,
      },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({ message: "Database connection error" });
  }
});

router.get("/categories", verifyToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const offset = (page - 1) * limit;
  try {
    const db = await connectToDatabase();

    // Lấy tổng số danh mục
    const [countResult] = await db.query(
      "SELECT COUNT(*) as count FROM category"
    );
    const totalCategories = countResult[0].count;
    const totalPages = Math.ceil(totalCategories / limit);

    const [rows] = await db.query(`SELECT * FROM category LIMIT ? OFFSET ?`, [
      limit,
      offset,
    ]);

    res.json({
      Status: true,
      data: rows,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Status: false, error: "Failed to fetch categories" });
  }
});

router.get("/employee", verifyToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const db = await connectToDatabase();

    const [countRows] = await db.query(
      "SELECT COUNT(*) AS count FROM employees"
    );
    const totalEmployees = countRows[0].count;
    const totalPages = Math.ceil(totalEmployees / limit);

    const [rows] = await db.query(
      `
      SELECT 
        employees.id,
        employees.name,
        employees.email,
        employees.salary,
        employees.address,
        employees.image,
        category.name AS category_name
      FROM employees
      LEFT JOIN category ON employees.category_id = category.id
      ORDER BY employees.id DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    res.json({
      Status: true,
      data: rows,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      Status: false,
      error: "Failed to fetch employees",
    });
  }
});

router.get("/employee/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ Status: false, error: "Employee not found" });
    }

    res.json({ Status: true, data: rows[0] });
  } catch (error) {
    console.error("Fetch single employee error:", error);
    res.status(500).json({ Status: false, error: "Server error" });
  }
});

router.get("/total-employees", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [result] = await db.query("SELECT COUNT(*) AS total FROM employees");
    res.json({ Status: true, totalEmployees: result[0].total });
  } catch (err) {
    console.error("Error fetching total employees:", err);
    res
      .status(500)
      .json({ Status: false, message: "Failed to get total employees" });
  }
});

router.get("/total-salary", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [result] = await db.query(
      "SELECT SUM(salary) AS total FROM employees"
    );
    res.json({ Status: true, totalSalary: result[0].total || 0 });
  } catch (err) {
    console.error("Error fetching total salary:", err);
    res
      .status(500)
      .json({ Status: false, message: "Failed to get total salary" });
  }
});

router.delete("/employee/:id", async (req, res) => {
  const employeeId = req.params.id;

  try {
    const db = await connectToDatabase();

    const [result] = await db.execute("DELETE FROM employees WHERE id = ?", [
      employeeId,
    ]);

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        message: "Employee deleted successfully",
      });
    } else {
      return res.json({ Status: false, error: "Employee not found" });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ Status: false, error: "Server error" });
  }
});

router.put("/employee/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, email, salary, address, category_id } = req.body;
  const db = await connectToDatabase();

  // Nếu có file ảnh, lấy tên file mới
  const image = req.file ? req.file.filename : null;

  try {
    let query = `
      UPDATE employees SET 
        name = ?, 
        email = ?, 
        salary = ?, 
        address = ?, 
        category_id = ?${image ? `, image = ?` : ""}
      WHERE id = ?
    `;

    let values = image
      ? [name, email, salary, address, category_id, image, id]
      : [name, email, salary, address, category_id, id];

    const [result] = await db.execute(query, values);

    if (result.affectedRows > 0) {
      res.json({ Status: true, message: "Employee updated successfully" });
    } else {
      res.json({ Status: false, error: "Update failed or no changes made" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Status: false, error: "Server error" });
  }
});

export default router;

const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Email Setup (Nodemailer)


// ✅ Serve Static Uploads (for images)
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// ✅ Send Verification Email


// ✅ Google Signup/Login


// ✅ Local JSON Property Fetch
app.get("/properties", (req, res) => {
  fs.readFile(path.join(__dirname, "data", "hi.json"), "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load properties" });
    res.json(JSON.parse(data));
  });
});

app.get("/properties/:id", (req, res) => {
  fs.readFile(path.join(__dirname, "data", "hi.json"), "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load property" });

    const properties = JSON.parse(data);
    const property = properties.find((p) => p._id === req.params.id);

    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  });
});

// ✅ Auth (Mocked for Portfolio)
const fakeUsers = [];

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  const existing = fakeUsers.find(u => u.email === email);
  if (existing) return res.status(400).json({ error: "Email already in use" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { name, email, password: hashedPassword };
  fakeUsers.push(user);

  res.status(201).json({ message: "User registered successfully", user });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = fakeUsers.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.status(200).json({ message: "Login successful", user });
});

// ✅ Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);


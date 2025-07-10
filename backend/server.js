const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Email Setup (Nodemailer)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,       // Set in .env
    pass: process.env.EMAIL_PASSWORD,   // Set in .env
  },
});

// ✅ Serve Static Uploads (for images)
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// ✅ Send Verification Email
app.post("/api/send-verification", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "✨ Your Key to Elite Estates",
    html: `
      <div style="font-family: 'Poppins', sans-serif;">
        <h2>Your Verification Code</h2>
        <p>Use this code to verify your account:</p>
        <h1>${verificationCode}</h1>
        <p>It will expire in 10 minutes.</p>
      </div>
    `,
  };

  try {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
      res.status(200).json({ message: "Verification email sent!", code: verificationCode });
    });
  } catch (err) {
    res.status(500).json({ error: "Email sending failed" });
  }
});

// ✅ Google Signup/Login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/api/google-signup", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // In real DB, you'd store user
    const user = {
      email,
      name,
      password: "GOOGLE_AUTH"
    };

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: "Google signup failed" });
  }
});

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
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

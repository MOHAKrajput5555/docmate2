// documate-backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Client = require('../models/Client');

// Login with mobile number (simulated OTP)
router.post('/login', async (req, res) => {
  const { mobile } = req.body;

  try {
    // Check if the user is an admin
    let user = await Admin.findOne({ mobile });
    let role = 'admin';

    if (!user) {
      // Check if the user is a client
      user = await Client.findOne({ mobile });
      role = 'client';
    }

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Simulate OTP (in a real app, send OTP via SMS)
    const otp = '123456'; // Simulated OTP
    res.status(200).json({ message: 'OTP sent', otp });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify OTP and generate JWT
router.post('/verify-otp', async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    // Simulate OTP verification
    if (otp !== '123456') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if the user is an admin
    let user = await Admin.findOne({ mobile });
    let role = 'admin';

    if (!user) {
      // Check if the user is a client
      user = await Client.findOne({ mobile });
      role = 'client';
    }

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate JWT
    const payload = {
      id: user._id,
      mobile: user.mobile,
      role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, mobile: user.mobile, role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
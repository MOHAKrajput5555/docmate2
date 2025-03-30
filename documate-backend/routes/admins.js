// documate-backend/routes/admins.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// Get all admins (with search and pagination)
router.get('/', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { search = '', page = 1, limit = 5 } = req.query;
  const query = {
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { mobile: { $regex: search, $options: 'i' } },
    ],
  };

  try {
    const admins = await Admin.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Admin.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      admins,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new admin (Super Admin only)
router.post('/', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' || (await Admin.findById(req.user.id)).role !== 'Super Admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { mobile, name, role, password } = req.body;

  try {
    let admin = await Admin.findOne({ mobile });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    admin = new Admin({
      mobile,
      name,
      role,
      password: await bcrypt.hash(password, 10),
    });

    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update admin role (Super Admin only)
router.put('/:id/role', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' || (await Admin.findById(req.user.id)).role !== 'Super Admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { role } = req.body;

  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    admin.role = role;
    await admin.save();
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
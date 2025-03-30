// documate-backend/routes/documents.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Document = require('../models/Document');

// Get documents for a client
router.get('/:clientId', authMiddleware, async (req, res) => {
  try {
    const documents = await Document.find({ clientId: req.params.clientId });
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
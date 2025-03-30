// documate-backend/routes/clients.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Client = require('../models/Client');

// Get client profile
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update subscription (admin only)
router.put('/:id/subscription', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { subscriptionEndDate, subscriptionStatus } = req.body;

  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.subscriptionEndDate = subscriptionEndDate;
    client.subscriptionStatus = subscriptionStatus;
    await client.save();

    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
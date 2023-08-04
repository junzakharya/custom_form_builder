const express = require('express');
const router = express.Router();
const FormResponse = require('../models/FormResponse');

// Submit form response
router.post('/responses', async (req, res) => {
  try {
    const response = new FormResponse(req.body);
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit the response.' });
  }
});

// Get all form responses
router.get('/responses', async (req, res) => {
  try {
    const responses = await FormResponse.find();
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch responses.' });
  }
});

module.exports = router;

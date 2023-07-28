// backend/routes/formResponseRoutes.js
const express = require('express');
const FormResponse = require('../models/FormResponse');

const router = express.Router();

// Create a new form response
router.post('/', async (req, res) => {
  try {
    const formResponse = await FormResponse.create(req.body);
    res.status(201).json(formResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all form responses
router.get('/', async (req, res) => {
  try {
    const formResponses = await FormResponse.find();
    res.json(formResponses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

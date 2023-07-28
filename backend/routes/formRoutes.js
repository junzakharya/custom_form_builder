// backend/routes/formRoutes.js
const express = require('express');
const Form = require('../models/Form');

const router = express.Router();

// Create a new form
router.post('/', async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.status(201).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

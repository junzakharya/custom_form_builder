const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Create a new form
router.post('/forms', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the form.' });
  }
});

// Get all forms
router.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forms.' });
  }
});

module.exports = router;

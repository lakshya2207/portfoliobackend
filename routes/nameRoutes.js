// routes/nameRoutes.js
const express = require('express');
const router = express.Router();
const Name = require('../models/nameModel');

// POST /api/submitName
router.get('/getNames', async (req, res) => {
  try {
    const names = await Name.find({});
    res.status(200).json(names);
  } catch (err) {
    res.send("phat gya code")
    // res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/submitName', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    // Check if the name already exists
    const existingName = await Name.findOne({ name });
    if (existingName) {
      
    return res.status(201).json({ message: 'Name already saved successfully' });
    }

    // Save the new name
    const newName = new Name({ name });
    await newName.save();
    res.status(201).json({ message: 'Name saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

const express = require('express');
const Intro = require('../models/introModel');
const router = express.Router();

// Get intro data
router.get('/', async (req, res) => {
  try {
    const intro = await Intro.findOne();
    console.log(intro);
    res.render('introform', { intro });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update intro data
router.post('/', async (req, res) => {
  try {
    let intro = await Intro.findOne();
    if (intro) {
      // Update existing data
      Object.assign(intro, req.body);
    } else {
      // Create new data
      intro = new Intro(req.body);
    }
    await intro.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

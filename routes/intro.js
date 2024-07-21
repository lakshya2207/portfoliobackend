const express = require('express');
const Intro = require('../models/introModel');
const router = express.Router();
// const isAuthenticated = require('../index');
// Get intro data
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
router.use(isAuthenticated)
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
router.post('/',isAuthenticated, async (req, res) => {
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

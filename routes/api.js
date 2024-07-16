const express = require('express');
const Intro = require('../models/introModel');
const Project = require('../models/projectModel');

const router = express.Router();

// Get intro data
router.get('/api/intro', async (req, res) => {
  try {
    const intro = await Intro.findOne();
    console.log("fetched")
    res.send(intro);
    // res.render('introform', { intro });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/api/projects', async (req, res) => {
    try {
      const projects = await Project.find();
      res.send(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;

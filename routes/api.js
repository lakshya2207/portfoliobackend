const express = require('express');
const Intro = require('../models/introModel');
const Project = require('../models/projectModel');

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

// Get intro data
router.get('/intro', async (req, res) => {
  try {
    const intro = await Intro.findOne();
    console.log("fetched")
    res.send(intro);
    // res.render('introform', { intro });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/projects', async (req, res) => {
    try {
      const projects = await Project.find();
      res.send(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;

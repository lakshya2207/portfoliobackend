const express = require('express');
const Project = require('../models/projectModel');
const router = express.Router();
const multer = require('multer');
const path = require('path')

// Middleware for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

// Get all projects and render the form
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.render('projects', { projects });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new project
router.post('/', upload.array('images', 10), async (req, res) => {
  const images = req.files.map(file => file.filename);
  console.log(req.body);
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    sourceCode: req.body.sourceCode,
    demo: req.body.demo,
    images: images,
    techStack: req.body.techStack,
    type: req.body.type
  });

  try {
    const newProject = await project.save();
    res.redirect('/projects');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// edit page
router.get('/:id/edit', async (req, res) => {
  const id = req.params.id;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.render('editProject', { project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a project by ID
router.post('/:id', upload.array('images', 10), async (req, res) => {
  const id = req.params.id;
  const images = req.files.map(file => file.filename);

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, {
      name: req.body.name,
      description: req.body.description,
      sourceCode: req.body.sourceCode,
      demo: req.body.demo,
      images: images,
      techStack: req.body.techStack,
      type: req.body.type
    }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.redirect('/projects'); // Redirect to projects page after update
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//deletes project
router.post('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.redirect('/projects'); // Redirect to projects page after deletion
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

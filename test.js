const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const path = require('path');
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

// auth
const expressSession = require('express-session');
const passport = require('passport');
const { initializingPassport } = require('./passportConfig');
initializingPassport(passport);
app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
app.use(fileUpload({
  useTempFiles: true
}));

app.use(cors());

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Routes
app.get('/', isAuthenticated, (req, res) => {
  res.render('home'); // Render home.ejs
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/" }));

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

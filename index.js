const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000
const cors =require('cors');
require('dotenv').config();
const fileUpload= require('express-fileupload');

const path = require('path');
const uri= process.env.MONGODB_URI
mongoose.connect(uri)

app.use(express.json())
app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname,'/public')));

app.use('/uploads', express.static('uploads'));
app.set('view engine','ejs');
app.use(fileUpload({
  useTempFiles:true
}))

app.use(cors(
  origin="*"
))
// Routes
const introRouter = require('./routes/intro');
app.use('/', introRouter);
const projectRouter = require('./routes/projects');
app.use('/projects', projectRouter);

const apiRouter = require('./routes/api');
app.use('/', apiRouter);


const nameRoutes = require('./routes/nameRoutes');
app.use('/api', nameRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
// module.exports=app;
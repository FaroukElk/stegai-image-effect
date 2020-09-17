const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const imageRoutes = require('./routes/image-routes');

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/steg_images')
  .then(() => console.log('Connected to Database!'))
  .catch(() => console.log('Database Connection Error'));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Custom-Header, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.use('/image', imageRoutes);


app.listen(PORT);
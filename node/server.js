const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const imageRoutes = require('./routes/image-routes');

// if (process.env.NODE_ENV === "production") {
//   require("@google/cloud-trace").start();
// }

// if (process.env.GCLOUD_PROJECT) {
//   require("@google/cloud-debug").start();
// }

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
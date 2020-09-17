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

mongoose.connect('mongodb://AdminUser:stegai123@35.227.45.183:27017/steg_images?authSource=admin')
  .then(() => console.log('Connected to Database!'))
  .catch((err) => console.log('Database Connection Error: ' + err));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Custom-Header, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.use('/image', imageRoutes);

app.get('/', (req, res) => {
  res.send('Hello Node.js from google cloud app engine');
});


app.listen(PORT);
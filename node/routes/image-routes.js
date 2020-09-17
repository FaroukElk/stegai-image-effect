const express = require('express');
const router = express.Router();

const Image = require('../schemas/image-schema');
const imageStorage = require('../google-cloud/image-storage');

// var multer = require('multer');
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, `${process.cwd()}/uploads/`)
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1].toLowerCase())
//     }
// });
// var upload = multer({ storage: storage });

router.get("/all", (req, res, next) => {
  Image.find({})
    .then((imageDataList) => {
      res.status(200).json(imageDataList);
    });
});

//

//Localhost Route
//router.post("/:effect", upload.single('file'), async  (req, res, next) => {

// Route with Google Cloud upload middleware
 router.post("/:effect", imageStorage.multer.single('file'), imageStorage.uploadToGCS, async  (req, res, next) => {

  console.log('Inside image post: ' + req.file);

  let data = req.body;

  if (req.file) {
    console.log(req.file);
  }
  
  //imageUrl = "https://media.gettyimages.com/photos/jersey-city-skyline-with-goldman-sachs-tower-reflected-in-water-of-picture-id1155210317?s=2048x2048";

  const image = new Image({
    url: req.file.cloudStoragePublicUrl,
    effect: req.params.effect,
    uploadDate: new Date()
  });

  image.save()
    .then(result => {
      res.status(200).json({
        newImage: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errror: err
      });
    });
});

module.exports = router;
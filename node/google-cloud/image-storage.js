const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');

const GOOGLE_CLOUD_PROJECT = process.env['GOOGLE_CLOUD_PROJECT'];
const CLOUD_BUCKET = GOOGLE_CLOUD_PROJECT + '-bucket';

const storage = new Storage();
const bucket = storage.bucket(CLOUD_BUCKET);

console.log(GOOGLE_CLOUD_PROJECT);
console.log(CLOUD_BUCKET);

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 * 2, // no larger than 10mb
  },
});

//const multer = Multer({dest: '/uploads/'});

function uploadToGCS(req, res, next) {
  console.log('Inside UploadToGCS: ' + req.file );
  if (!req.file) {
    next();
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    },
    resumable: false
  });

  stream.on('error', err => {
    console.log('Upload to GCS error: ' + err);
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', async () => {
    req.fild.cloudStorageObject = gcsname;
    await file.makePublic();
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
}

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

module.exports = { getPublicUrl, uploadToGCS, multer };
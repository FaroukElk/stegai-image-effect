const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  url: { type: String, required: true },
  effect: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now}
});

module.exports = mongoose.model("Image", ImageSchema);
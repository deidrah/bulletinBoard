const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String },
  status: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Post', postSchema);

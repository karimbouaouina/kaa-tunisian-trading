const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // Add image field
});

module.exports = mongoose.model('Category', CategorySchema);

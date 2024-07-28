const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/categories/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const category = new Category({ name, image });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

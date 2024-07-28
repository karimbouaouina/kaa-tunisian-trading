const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const product = new Product({ name, description, price, category, stock, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const products = await Product.find()
      .populate('category')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments();

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/related/:id/:category', async (req, res) => {

  try {
    const { id, category } = req.params;
    console.log(category);
    const decodedCategory = decodeURIComponent(category);
    const products = await Product.find({
        'category.name': decodedCategory,
        _id: { $ne: id }
      })
      .limit(4)
      .exec();
      console.log(products)
    res.json({
      products,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const featuredProductIds = [
      '667c43d903e0754e8b2e4622',
      '667ec35b3154a56a0d958264',
      '667ec35f3154a56a0d958266',
      '667ec3633154a56a0d958269'
    ];
    
    const products = await Product.find({
      _id: { $in: featuredProductIds }
    }).populate('category');

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock, image },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

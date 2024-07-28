require('dotenv').config();
const express = require('express');
const database = require('./database/db.config');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/categories');
const cartRoutes = require('./routes/carts');
const authMiddleware = require('./middlewares/authMiddleware');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

database.mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to the database'))
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', authMiddleware, cartRoutes);

app.get('/api/products/featured', async (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

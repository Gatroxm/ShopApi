// routes/product.js
const express = require('express');
const { addProduct, getStoreProducts } = require('../controllers/productController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addProduct);
router.get('/:storeId', getStoreProducts);

module.exports = router;

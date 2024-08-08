// routes/category.js
const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createCategory);
router.get('/', getCategories);
router.delete('/:id', auth, deleteCategory);

module.exports = router;

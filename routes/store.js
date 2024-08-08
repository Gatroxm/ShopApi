// routes/store.js
const express = require('express');
const { createStore, getUserStores } = require('../controllers/storeController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createStore);
router.get('/', auth, getUserStores);

module.exports = router;

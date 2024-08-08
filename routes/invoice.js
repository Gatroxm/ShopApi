// routes/invoice.js
const express = require('express');
const { createInvoice, getUserInvoices, searchInvoices } = require('../controllers/invoiceController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createInvoice);
router.get('/', auth, getUserInvoices);
router.get('/search', auth, searchInvoices); // Ruta para búsqueda de facturas

module.exports = router;

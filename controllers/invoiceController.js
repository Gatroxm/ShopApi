// controllers/invoiceController.js
const Invoice = require('../models/Invoice');
const User = require('../models/User');
const Product = require('../models/Product');
const Store = require('../models/Store');

const createInvoice = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId).populate('store');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const buyer = await User.findById(req.user.id);
        const seller = await User.findById(product.store.owner);
        if (!buyer || !seller) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generar un número de factura único
        const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const invoice = new Invoice({
            invoiceNumber,
            buyer: buyer._id,
            seller: seller._id,
            product: product._id,
            quantity,
            totalPrice: product.price * quantity,
            buyerAddress: buyer.address,
            sellerAddress: seller.address,
        });

        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ buyer: req.user.id }).populate('product seller');
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const searchInvoices = async (req, res) => {
    const { invoiceNumber, startDate, endDate } = req.query;
    const storeOwnerId = req.user.id;

    try {
        let query = { seller: storeOwnerId };

        if (invoiceNumber) {
            query.invoiceNumber = invoiceNumber;
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate);
            }
        }

        const invoices = await Invoice.find(query).populate('product buyer');
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createInvoice, getUserInvoices, searchInvoices };

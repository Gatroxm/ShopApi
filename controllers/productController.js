// controllers/productController.js
const Product = require('../models/Product');
const Store = require('../models/Store');
const Category = require('../models/Category');

const addProduct = async (req, res) => {
    const { name, price, description, category, storeId } = req.body;

    try {
        const store = await Store.findById(storeId);
        const categoryExists = await Category.findById(category);

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (store.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const product = new Product({
            name,
            price,
            description,
            category,
            store: storeId
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addProduct, getStoreProducts };

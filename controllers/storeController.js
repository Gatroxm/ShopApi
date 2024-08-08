// controllers/storeController.js
const Store = require('../models/Store');

const createStore = async (req, res) => {
    const { name, description } = req.body;

    try {
        const store = new Store({
            name,
            description,
            owner: req.user.id
        });

        await store.save();
        res.status(201).json(store);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserStores = async (req, res) => {
    try {
        const stores = await Store.find({ owner: req.user.id });
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createStore, getUserStores };

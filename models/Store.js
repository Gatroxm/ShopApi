// models/Store.js
const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
    }
}, { timestamps: true });

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;

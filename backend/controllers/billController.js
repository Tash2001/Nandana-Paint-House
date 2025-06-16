// controllers/billController.js
const billService = require('../services/billService');

const createBill = (req, res) => {
    const { bill, items } = req.body;

    if (!bill || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Invalid bill or items data' });
    }

    billService.createNewBill(bill, items, (err, billId) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: 'Bill created', billId });
    });
};

module.exports = { createBill };



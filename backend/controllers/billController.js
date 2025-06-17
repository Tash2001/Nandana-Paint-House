// controllers/billController.js
const { createNewBill } = require('../services/billService');

const createBills = (req, res) => {
    const { bill, items } = req.body;

    if (!bill || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Invalid bill or items data' });
    }

    createNewBill(bill, items, (err, billId) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: 'Bill created', billId });
    });
};

module.exports = { createBills };



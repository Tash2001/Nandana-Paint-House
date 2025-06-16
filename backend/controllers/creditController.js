// controllers/creditController.js
const creditModel = require('../models/creditModel');

const addCreditCustomer = (req, res) => {
    const { name, phone, bill_id, total_credit } = req.body;

    if (!name || !bill_id || !total_credit) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    creditModel.addCreditCustomer({ name, phone, bill_id, total_credit }, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Credit record added', credit_id: id });
    });
};

const creditController = {
    payCredit: (req, res) => {
        const { creditCustomerId, amount } = req.body;

        if (!creditCustomerId || !amount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        CreditModel.insertPayment(creditCustomerId, amount, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(200).json({ message: 'Payment recorded successfully' });
        });
    },

    getAllCreditCustomers: (req, res) => {
        CreditModel.getAllCreditCustomers((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getPaymentHistory: (req, res) => {
        const { id } = req.params;

        CreditModel.getPaymentHistory(id, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    }
};

module.exports = { addCreditCustomer, creditController };

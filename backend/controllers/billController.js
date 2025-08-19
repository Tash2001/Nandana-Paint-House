// controllers/billController.js
const { createNewBill, getBillById } = require('../services/billService');

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

const printBill = async (req, res) => {
    try {

        const billId = req.params.billId;
        console.log('billId - ' + billId);
        const bill = await getBillById(billId);

        if (!bill) {
            return res.status(404).json({ success: false, message: "Bill not found" });
        }

        // You can send JSON for frontend printing or raw HTML/PDF
        res.json({ success: true, bill });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
module.exports = { createBills, printBill };



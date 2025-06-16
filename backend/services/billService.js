// services/billService.js
const billModel = require('../models/billModel');

const createNewBill = (billData, items, callback) => {
    // Could add validations or calculations here in future
    billModel.createBill(billData, items, callback);
};

module.exports = { createNewBill };

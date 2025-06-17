// services/billService.js

const { createBill } = require("../models/billModel");

const createNewBill = (billData, items, callback) => {
    // Could add validations or calculations here in future
    createBill(billData, items, callback);
};

module.exports = { createNewBill };
